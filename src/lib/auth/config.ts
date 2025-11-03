import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    trustHost: true,

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                // Load the data from the database when the user first logs in
                token.id = user.id;

                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        address: true,
                        phone: true,
                        zip: true,
                        city: true,
                        state: true,
                    },
                });

                if (dbUser) {
                    token.address = dbUser.address;
                    token.phone = dbUser.phone;
                    token.zip = dbUser.zip;
                    token.city = dbUser.city;
                    token.state = dbUser.state;
                }
            }

            // When the session is updated (trigger === "update"), update the token
            if (trigger === "update" && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },
        async session({ session, token }) {
            // Extend the session object with the data from the token.
            if (session.user) {
                session.user.id = token.id as string;
                session.user.address = token.address as
                    | string
                    | null
                    | undefined;
                session.user.phone = token.phone as string | null | undefined;
                session.user.zip = token.zip as string | null | undefined;
                session.user.city = token.city as string | null | undefined;
                session.user.state = token.state as string | null | undefined;
            }
            return session;
        },
    },

    debug: process.env.NODE_ENV === "development",
});
