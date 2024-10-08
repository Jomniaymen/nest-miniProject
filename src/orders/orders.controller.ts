import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orderdto } from './dto/order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags('Orders')  
@ApiBearerAuth('JWT-auth') 
@Controller('orders')
@UseGuards( RolesGuard)
export class OrdersController {
    
        constructor(private readonly ordersServicee: OrdersService) {}
        
        @Post()
        @Roles('customer','admin')
    @UseGuards(RolesGuard)
            async createoreder(@Body() orderdto:Orderdto) {
                return this.ordersServicee.createProduct( orderdto);
            }
        
            @Get()
            @Roles('customer')
            @UseGuards(RolesGuard)
            async getAllOrders() {
                return this.ordersServicee.getallpro();
            }
        
            @Get(':id')
            @Roles('customer','admin')
            @UseGuards(RolesGuard)
            async getOrderById(@Param('id') id: string) {
                return this.ordersServicee.getProductById(id);
            }
        
            @Put(':id')
            @Roles('admin')
            @UseGuards(RolesGuard)
            async updateOrder(@Param('id') id: string, @Body()  orderdto: Orderdto) {
                return this.ordersServicee.updateProduct(id,  orderdto);
            }
        
            @Delete(':id')
            @Roles('admin')
            @UseGuards(RolesGuard)
            async deleteOrder(@Param('id') id: string) {
                return this.ordersServicee.deleteProduct(id);   
        
            }
        
}
