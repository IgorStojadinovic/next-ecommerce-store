import { auth } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        console.log("No user ID in session:", session);
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: parseInt(session.user.id),
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
