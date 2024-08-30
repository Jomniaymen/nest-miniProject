import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
constructor(private readonly ProductsService: ProductsService) {}

@Post()
@Roles('customer')
    @UseGuards(RolesGuard)
    async createProduct(@Body() productDto:ProductDto) {
        return this.ProductsService.createProduct(productDto);
    }

    @Get()
    @Roles('admin')
    @UseGuards(RolesGuard)
    async getAllProducts() {
        return this.ProductsService.getallpro();
    }

    @Get(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    async getProductById(@Param('id') id: string) {
        return this.ProductsService.getProductById(id);
    }

    @Put(':id')
    @Roles('customer')
    @UseGuards(RolesGuard)
    async updateProduct(@Param('id') id: string, @Body() productDto: ProductDto) {
        return this.ProductsService.updateProduct(id, productDto);
    }

    @Delete(':id')
    @Roles('customer')
    @UseGuards(RolesGuard)
    async deleteProduct(@Param('id') id: string) {
        return this.ProductsService.deleteProduct(id);   

    }
}