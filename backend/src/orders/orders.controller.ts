import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    list(
        @CurrentUser() current: { id: string },
        @Query("page") page?: string,
    ) {
        return this.ordersService.list(current.id, Number(page));
    }

    @Post()
    create(
        @CurrentUser() current: { id: string },
        @Body() body: CreateOrderDto,
    ) {
        return this.ordersService.create(current.id, body);
    }

    @Patch(":id/cancel")
    cancel(
        @CurrentUser() current: { id: string },
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.ordersService.cancel(current.id, id);
    }
}
