import { IsString, IsNumber, IsOptional, Min, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ProductDto {
  @IsString()
  namepro: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;



  @IsArray()
  @IsOptional()

  orders: Types.ObjectId[]; 
}
