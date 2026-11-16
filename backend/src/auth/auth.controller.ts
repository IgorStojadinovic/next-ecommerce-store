import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { LoginDto, RegisterDto } from "./dto/credentials.dto";
import { GoogleAuthGuard, GoogleCallbackGuard } from "./google-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { PrismaService } from "../prisma/prisma.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService,
    ) {}

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    google() {
        return;
    }

    @Get("google/callback")
    @UseGuards(GoogleCallbackGuard)
    googleCallback(
        @Req() request: Request & { user?: User },
        @Res() response: Response,
    ) {
        if (!request.user) {
            response.redirect(this.authService.webOrigin());
            return;
        }

        const sessionUser = this.authService.toSessionUser(request.user);
        this.authService.setSessionCookie(response, sessionUser);
        response.redirect(this.authService.webOrigin());
    }

    @Post("register")
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.authService.register(dto);
        const sessionUser = this.authService.toSessionUser(user);
        this.authService.setSessionCookie(response, sessionUser);
        return sessionUser;
    }

    @Post("login")
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.authService.login(dto.email, dto.password);
        const sessionUser = this.authService.toSessionUser(user);
        this.authService.setSessionCookie(response, sessionUser);
        return sessionUser;
    }

    @Post("logout")
    logout(@Res() response: Response) {
        this.authService.clearSessionCookie(response);
        response.status(204).send();
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    async me(@CurrentUser() current: { id: string }) {
        const user = await this.prisma.user.findUnique({
            where: { id: current.id },
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.toSessionUser(user);
    }
}
