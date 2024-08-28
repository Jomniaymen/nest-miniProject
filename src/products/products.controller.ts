import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
constructor(private readonly ProductsService: ProductsService) {}

@Post()
    async createProduct(@Body() productDto:ProductDto) {
        return this.ProductsService.createProduct(productDto);
    }

    @Get()
    async getAllProducts() {
        return this.ProductsService.getallpro();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.ProductsService.getProductById(id);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productDto: ProductDto) {
        return this.ProductsService.updateProduct(id, productDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.ProductsService.deleteProduct(id);   

    }
}