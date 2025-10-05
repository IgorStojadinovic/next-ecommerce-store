import { auth } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, address, phone, zip, city, state } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(session.user.id),
            },
            data: {
                name,
                address,
                phone,
                zip,
                city,
                state,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
