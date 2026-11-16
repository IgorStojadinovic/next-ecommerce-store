import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
    getAuthenticateOptions(_context: ExecutionContext) {
        return {
            session: false,
            accessType: "offline",
            prompt: "consent",
        };
    }
}

@Injectable()
export class GoogleCallbackGuard extends AuthGuard("google") {
    handleRequest<TUser = unknown>(error: unknown, user: TUser): TUser {
        if (error || !user) {
            return null as TUser;
        }
        return user;
    }
}
