import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifySessionToken(token);

    const isAuthPage = request.nextUrl.pathname.startsWith("/account");

    if (isAuthPage && !user) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*"],
};
