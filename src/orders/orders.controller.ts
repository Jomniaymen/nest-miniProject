import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orderdto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
    
        constructor(private readonly ordersServicee: OrdersService) {}
        
        @Post()
            async createProduct(@Body() orderdto:Orderdto) {
                return this.ordersServicee.createProduct( orderdto);
            }
        
            @Get()
            async getAllProducts() {
                return this.ordersServicee.getallpro();
            }
        
            @Get(':id')
            async getProductById(@Param('id') id: string) {
                return this.ordersServicee.getProductById(id);
            }
        
            @Put(':id')
            async updateProduct(@Param('id') id: string, @Body()  orderdto: Orderdto) {
                return this.ordersServicee.updateProduct(id,  orderdto);
            }
        
            @Delete(':id')
            async deleteProduct(@Param('id') id: string) {
                return this.ordersServicee.deleteProduct(id);   
        
            }
        
}
