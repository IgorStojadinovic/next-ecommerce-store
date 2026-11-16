import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    update(userId: string, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data,
        });
    }

    async remove(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException("Account not found");
        }

        await this.prisma.$transaction(async (tx) => {
            const orders = await tx.order.findMany({
                where: { userId },
                select: { id: true },
            });
            const carts = await tx.cart.findMany({
                where: { userId },
                select: { id: true },
            });

            if (orders.length > 0) {
                await tx.orderItem.deleteMany({
                    where: { orderId: { in: orders.map((order) => order.id) } },
                });
                await tx.order.deleteMany({ where: { userId } });
            }

            if (carts.length > 0) {
                await tx.cartItem.deleteMany({
                    where: { cartId: { in: carts.map((cart) => cart.id) } },
                });
                await tx.cart.deleteMany({ where: { userId } });
            }

            await tx.user.delete({ where: { id: userId } });
        });
    }
}
