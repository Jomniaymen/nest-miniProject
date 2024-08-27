import { IsString, IsEmail, IsNumber, IsOptional, MinLength, IsEnum, isEnum } from 'class-validator';

export class updateuserDTO {


  @IsString()
  readonly name: string;

}
