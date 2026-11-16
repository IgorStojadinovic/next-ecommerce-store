import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    address?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    zip?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    city?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    state?: string;
}
