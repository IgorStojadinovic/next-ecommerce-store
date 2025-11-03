import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { cartItems, formData } = body;

        // Validation
        if (!cartItems || cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        if (
            !formData ||
            !formData.name ||
            !formData.address ||
            !formData.paymentMethod
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Find all products by name
        const productNames = cartItems.map(
            (item: { name: string }) => item.name
        );
        const products = await prisma.product.findMany({
            where: {
                name: {
                    in: productNames,
                },
            },
        });

        // Check if all products were found
        if (products.length !== cartItems.length) {
            return new NextResponse("Some products not found", { status: 404 });
        }

        // Create map for faster lookup
        const productMap = new Map(products.map((p) => [p.name, p]));

        // Calculate total amount
        let totalAmount = new Prisma.Decimal(0);
        const orderItems = cartItems.map(
            (item: { name: string; quantity: number }) => {
                const product = productMap.get(item.name);
                if (!product) {
                    throw new Error(`Product ${item.name} not found`);
                }
                const itemTotal = new Prisma.Decimal(product.price).mul(
                    item.quantity
                );
                totalAmount = totalAmount.add(itemTotal);

                return {
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                };
            }
        );

        // Add shipping cost (flat rate: 50)
        const shippingCost = new Prisma.Decimal(50);
        totalAmount = totalAmount.add(shippingCost);

        // Create shipping address
        const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;

        // Convert paymentMethod to enum format
        let paymentMethod: "CREDIT_CARD" | "CASH_ON_DELIVERY";
        if (
            formData.paymentMethod === "e-Money" ||
            formData.paymentMethod === "credit-card"
        ) {
            paymentMethod = "CREDIT_CARD";
        } else {
            paymentMethod = "CASH_ON_DELIVERY";
        }

        // Create order with order items in transaction
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId: session.user.id as string,
                    totalAmount,
                    shippingAddress,
                    shippingMethod: "Standard", // Default shipping method
                    paymentMethod,
                    paymentStatus:
                        paymentMethod === "CREDIT_CARD"
                            ? "COMPLETED"
                            : "PENDING",
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            return newOrder;
        });

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                totalAmount: order.totalAmount.toString(),
                itemCount: order.items.length,
                createdAt: order.createdAt,
            },
        });
    } catch (error) {
        console.error("[ORDER_CREATE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
