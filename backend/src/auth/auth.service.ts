import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { CookieOptions, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { PrismaService } from "../prisma/prisma.service";
import { SESSION_COOKIE, SessionUser } from "./session-user";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
    ) {}

    async upsertGoogleUser(
        profile: Profile,
        tokens: { accessToken: string; refreshToken?: string },
    ) {
        const email = profile.emails?.[0]?.value?.trim().toLowerCase();
        if (!email) {
            throw new UnauthorizedException("Google account has no email");
        }

        const providerAccountId = profile.id;
        const existingAccount = await this.prisma.account.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: "google",
                    providerAccountId,
                },
            },
            include: { user: true },
        });

        let user =
            existingAccount?.user ??
            (await this.prisma.user.findFirst({
                where: { email: { equals: email, mode: "insensitive" } },
            }));

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email,
                    name: profile.displayName,
                    image: profile.photos?.[0]?.value,
                    emailVerified: new Date(),
                },
            });
        } else {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    name: user.name ?? profile.displayName,
                    image: user.image ?? profile.photos?.[0]?.value,
                    emailVerified: user.emailVerified ?? new Date(),
                },
            });
        }

        await this.prisma.account.upsert({
            where: {
                provider_providerAccountId: {
                    provider: "google",
                    providerAccountId,
                },
            },
            create: {
                userId: user.id,
                type: "oauth",
                provider: "google",
                providerAccountId,
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken,
                token_type: "Bearer",
                scope: "email profile",
            },
            update: {
                userId: user.id,
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken,
            },
        });

        return user;
    }

    async register(input: { name: string; email: string; password: string }) {
        const email = input.email.trim().toLowerCase();
        const existing = await this.prisma.user.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
        });

        if (existing?.password) {
            throw new ConflictException(
                "An account with this email already exists",
            );
        }

        if (existing) {
            throw new ConflictException(
                "This email already uses Google. Continue with Google.",
            );
        }

        return this.prisma.user.create({
            data: {
                email,
                name: input.name.trim(),
                password: await bcrypt.hash(input.password, 12),
            },
        });
    }

    async login(emailInput: string, password: string) {
        const email = emailInput.trim().toLowerCase();
        const user = await this.prisma.user.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
        });

        if (!user?.password) {
            throw new UnauthorizedException(
                user
                    ? "This account uses Google. Continue with Google."
                    : "Invalid email or password",
            );
        }

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return user;
    }

    toSessionUser(user: User): SessionUser {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            address: user.address,
            phone: user.phone,
            zip: user.zip,
            city: user.city,
            state: user.state,
        };
    }

    signToken(user: SessionUser) {
        return this.jwt.sign({
            sub: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            address: user.address,
            phone: user.phone,
            zip: user.zip,
            city: user.city,
            state: user.state,
        });
    }

    cookieOptions(): CookieOptions {
        const secure = this.config.get("NODE_ENV") === "production";
        return {
            httpOnly: true,
            secure,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
    }

    setSessionCookie(response: Response, user: SessionUser) {
        response.cookie(
            SESSION_COOKIE,
            this.signToken(user),
            this.cookieOptions(),
        );
    }

    clearSessionCookie(response: Response) {
        const { maxAge, ...options } = this.cookieOptions();
        void maxAge;
        response.clearCookie(SESSION_COOKIE, options);
    }

    webOrigin() {
        return this.config.getOrThrow<string>("WEB_ORIGIN");
    }
}
