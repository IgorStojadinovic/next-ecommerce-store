import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth/config";

export async function middleware(request: NextRequest) {
    const session = await auth();

    const isAuthPage = request.nextUrl.pathname.startsWith("/account");

    if (isAuthPage && !session) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*"],
};
