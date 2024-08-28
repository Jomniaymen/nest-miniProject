import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.schema';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
   constructor(@InjectModel(Product.name) private productModel:Model<Product>){}

   async createProduct(@Body() dto:ProductDto){
    const newuser=await this.productModel.create(dto)
    return newuser
}
async getProductById( id:string){
    const findprodct=await this.productModel.findById(id).populate('orders')
    if (!findprodct){
      throw new NotFoundException('product not foud')
    }
    return findprodct
}
async  getallpro(){
    return await this.productModel.find().populate('orders')
 
   
}
async updateProduct(id:string, dto:ProductDto){
    return await this.productModel.findByIdAndUpdate(id,dto,{new:true})
   
}
async deleteProduct(id:string){
    return await this.productModel.findByIdAndDelete(id)
   
}
}
