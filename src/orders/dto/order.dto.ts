import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsNotEmpty, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class Orderdto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerName: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  orderDate: Date;

 
  @ApiProperty()
  @IsArray()
  @IsOptional()
  products:Types.ObjectId[];


}
