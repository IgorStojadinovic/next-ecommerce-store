import { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            address?: string | null;
            phone?: string | null;
            zip?: string | null;
            city?: string | null;
            state?: string | null;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        address?: string | null;
        phone?: string | null;
        zip?: string | null;
        city?: string | null;
        state?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        address?: string | null;
        phone?: string | null;
        zip?: string | null;
        city?: string | null;
        state?: string | null;
    }
}
