import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from "class-validator";

export class CartItemDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsInt()
    @Min(1)
    quantity!: number;
}

export class CheckoutFormDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod!: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    zip?: string;

    @IsOptional()
    @IsString()
    state?: string;
}

export class CreateOrderDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    cartItems!: CartItemDto[];

    @ValidateNested()
    @Type(() => CheckoutFormDto)
    formData!: CheckoutFormDto;
}
