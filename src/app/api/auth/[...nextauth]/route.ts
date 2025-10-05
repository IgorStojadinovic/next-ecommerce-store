import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { authSchema } from "@/lib/validations";

export const authOptions = {
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    address: token.address,
                    phone: token.phone,
                    zip: token.zip,
                    city: token.city,
                    state: token.state,
                },
            };
        },
        async jwt({ token, user }: { token: JWT; user: User | undefined }) {
            if (user) {
                return {
                    ...token,
                    sub: user.id,
                    address: user.address,
                    phone: user.phone,
                    zip: user.zip,
                    city: user.city,
                    state: user.state,
                };
            }
            return token;
        },
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const password = credentials.password as string;

                const validCredentials = await authSchema.safeParseAsync(
                    credentials
                );

                if (!validCredentials.success) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user) throw new Error("User not found");

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }

                return { ...user, id: user.id.toString() };
            },
        }),
    ],

    session: {
        strategy: "jwt" as const,
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export const GET = handlers.GET;
export const POST = handlers.POST;
