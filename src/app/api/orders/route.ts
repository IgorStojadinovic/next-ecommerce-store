import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id as string,
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
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("[ORDERS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
