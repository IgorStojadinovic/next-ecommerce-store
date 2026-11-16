import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PaymentMethod, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

const SHIPPING_COST = new Prisma.Decimal(50);

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string, body: CreateOrderDto) {
        const { cartItems, formData } = body;
        const productNames = cartItems.map((item) => item.name);
        const products = await this.prisma.product.findMany({
            where: { name: { in: productNames } },
        });

        if (products.length !== cartItems.length) {
            throw new NotFoundException("Some products not found");
        }

        const productMap = new Map(products.map((product) => [product.name, product]));
        let totalAmount = new Prisma.Decimal(0);
        const orderItems = cartItems.map((item) => {
            const product = productMap.get(item.name);
            if (!product) {
                throw new NotFoundException(`Product ${item.name} not found`);
            }
            totalAmount = totalAmount.add(
                new Prisma.Decimal(product.price).mul(item.quantity),
            );
            return {
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
            };
        });

        totalAmount = totalAmount.add(SHIPPING_COST);
        const shippingAddress = `${formData.address}, ${formData.city ?? ""}, ${formData.state ?? ""} ${formData.zip ?? ""}`;
        const paymentMethod = this.paymentMethod(formData.paymentMethod);

        const order = await this.prisma.$transaction((tx) =>
            tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    shippingAddress,
                    shippingMethod: "Standard",
                    paymentMethod,
                    paymentStatus:
                        paymentMethod === "CREDIT_CARD" ? "COMPLETED" : "PENDING",
                    items: { create: orderItems },
                },
                include: { items: true },
            }),
        );

        return {
            success: true,
            order: {
                id: order.id,
                totalAmount: order.totalAmount.toString(),
                itemCount: order.items.length,
                createdAt: order.createdAt,
            },
        };
    }

    async list(userId: string, requestedPage?: number) {
        const pageSize = 4;
        const total = await this.prisma.order.count({ where: { userId } });
        const pageCount = total === 0 ? 0 : Math.ceil(total / pageSize);
        const page =
            pageCount === 0
                ? 1
                : Math.min(
                      Math.max(1, Number.isFinite(requestedPage) ? requestedPage! : 1),
                      pageCount,
                  );

        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: { select: { name: true } } },
                },
            },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return {
            page,
            pageSize,
            total,
            pageCount,
            items: orders.map((order) => ({
                id: order.id,
                createdAt: order.createdAt.toISOString(),
                totalAmount: Number(order.totalAmount),
                status: order.status,
                paymentStatus: order.paymentStatus,
                shippingAddress: order.shippingAddress || "",
                shippingMethod: order.shippingMethod || "",
                items: order.items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: Number(item.price),
                    product: { name: item.product.name },
                })),
            })),
        };
    }

    async cancel(userId: string, orderId: number) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
        });

        if (!order) {
            throw new NotFoundException("Order not found");
        }

        if (order.status !== "PENDING" && order.status !== "PROCESSING") {
            throw new BadRequestException("This order can no longer be cancelled");
        }

        await this.prisma.$transaction([
            this.prisma.orderItem.deleteMany({ where: { orderId: order.id } }),
            this.prisma.order.delete({ where: { id: order.id } }),
        ]);

        return { id: order.id };
    }

    private paymentMethod(value: string): PaymentMethod {
        if (
            value === "card" ||
            value === "e-Money" ||
            value === "credit-card"
        ) {
            return "CREDIT_CARD";
        }
        return "CASH_ON_DELIVERY";
    }
}
