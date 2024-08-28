import { IsString, IsNumber, IsOptional, Min, IsNotEmpty, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class Orderdto {
  
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsOptional()
  orderDate: Date;

 

  @IsArray()
  @IsOptional()
  products:{productId: Types.ObjectId; quantity: number } ;


}
