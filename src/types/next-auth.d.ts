import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

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

    interface User extends DefaultUser {
        address?: string | null;
        phone?: string | null;
        zip?: string | null;
        city?: string | null;
        state?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        address?: string | null;
        phone?: string | null;
        zip?: string | null;
        city?: string | null;
        state?: string | null;
    }
}
