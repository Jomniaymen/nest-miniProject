import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional, MinLength, IsEnum, isEnum } from 'class-validator';

export class updateuserDTO {

  @ApiProperty()
  @IsString()
  readonly name: string;
  
  @ApiProperty()
@IsEmail()
  readonly email: string;

 @ApiProperty()
  @IsEnum(['admin','customer'])
  readonly role: 'admin'|'customer';
}
