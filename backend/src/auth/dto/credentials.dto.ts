import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(1, { message: "Name is required" })
    name: string;

    @IsEmail({}, { message: "Enter a valid email" })
    email: string;

    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters" })
    password: string;
}

export class LoginDto {
    @IsEmail({}, { message: "Enter a valid email" })
    email: string;

    @IsString()
    @MinLength(1, { message: "Password is required" })
    password: string;
}
