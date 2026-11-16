import { Body, Controller, Delete, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "../auth/auth.service";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Put("me")
    @UseGuards(JwtAuthGuard)
    async updateMe(
        @CurrentUser() current: { id: string },
        @Body() body: UpdateUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.usersService.update(current.id, body);
        const sessionUser = this.authService.toSessionUser(user);
        this.authService.setSessionCookie(response, sessionUser);
        return sessionUser;
    }

    @Delete("me")
    @UseGuards(JwtAuthGuard)
    async deleteMe(
        @CurrentUser() current: { id: string },
        @Res() response: Response,
    ) {
        await this.usersService.remove(current.id);
        this.authService.clearSessionCookie(response);
        response.status(204).send();
    }
}
