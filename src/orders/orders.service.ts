import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.schema';
import { Orderdto } from './dto/order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private productModel:Model<Order>){}

    async createProduct(@Body() dto:Orderdto){
     const newuser=await this.productModel.create(dto)
     return newuser
 }
 async getProductById( id:string){
     const findprodct=await this.productModel.findById(id).populate('products.productid');
     if (!findprodct){
       throw new NotFoundException('product not foud')
     }
     return findprodct
 }
 async  getallpro(){
     return await this.productModel.find().populate('products.productid');
  
    
 }
 async updateProduct(id:string, dto:Orderdto){
     return await this.productModel.findByIdAndUpdate(id,dto,{new:true}).populate('products.productid');
    
 }
 async deleteProduct(id:string){
     return await this.productModel.findByIdAndDelete(id)
    
 }


}
