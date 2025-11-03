import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function PUT(request: Request) {
    try {
        const session = await auth();
        const body = await request.json();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: body,
        });

        return NextResponse.json(user);
    } catch {
        console.error("[USER_UPDATE]");
        return new NextResponse("Internal error", { status: 500 });
    }
}
