import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./token";

export async function getSession() {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    const user = await verifySessionToken(token);
    return user ? { user } : null;
}

export async function apiAuthHeaders(): Promise<HeadersInit> {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) {
        return {};
    }
    return { cookie: `${SESSION_COOKIE}=${token}` };
}

export function apiUrl() {
    return (process.env.API_URL ?? "http://localhost:3001").replace(/\/+$/, "");
}
