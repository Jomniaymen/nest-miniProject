import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ProductDto {
  @ApiProperty()
  @IsString()
  namepro: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;


  @ApiProperty()
  @IsArray()
  @IsOptional()

  orders: Types.ObjectId[]; 
}
