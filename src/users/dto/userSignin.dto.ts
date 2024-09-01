import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional, MinLength, IsEnum, isEnum } from 'class-validator';

export class SigninDto {



  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEnum(['admin','customer'])
  readonly role: 'admin'|'customer'; 
}
