import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleCallbackGuard, GoogleAuthGuard } from "./google-auth.guard";
import { GoogleStrategy } from "./google.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({ session: false }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>("JWT_SECRET"),
                signOptions: { expiresIn: "7d" },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
        JwtStrategy,
        JwtAuthGuard,
        GoogleAuthGuard,
        GoogleCallbackGuard,
    ],
    exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
