import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        address?: string | null;
        phone?: string | null;
        zip?: string | null;
        city?: string | null;
        state?: string | null;
    }

    interface Session {
        user: User;
    }
}
