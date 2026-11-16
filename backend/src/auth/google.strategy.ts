import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        config: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: config.getOrThrow<string>("GOOGLE_CLIENT_ID"),
            clientSecret: config.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
            callbackURL: config.getOrThrow<string>("GOOGLE_CALLBACK_URL"),
            scope: ["email", "profile"],
        });
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ) {
        return this.authService.upsertGoogleUser(profile, {
            accessToken,
            refreshToken,
        });
    }
}
