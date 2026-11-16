import { jwtVerify } from "jose";

export const SESSION_COOKIE = "access_token";

export type SessionUser = {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    zip: string | null;
    city: string | null;
    state: string | null;
};

function asString(value: unknown) {
    return typeof value === "string" ? value : null;
}

export async function verifySessionToken(
    token: string | undefined | null,
): Promise<SessionUser | null> {
    if (!token || !process.env.JWT_SECRET) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET),
        );
        if (typeof payload.sub !== "string") {
            return null;
        }

        return {
            id: payload.sub,
            email: asString(payload.email),
            name: asString(payload.name),
            image: asString(payload.image),
            address: asString(payload.address),
            phone: asString(payload.phone),
            zip: asString(payload.zip),
            city: asString(payload.city),
            state: asString(payload.state),
        };
    } catch {
        return null;
    }
}
