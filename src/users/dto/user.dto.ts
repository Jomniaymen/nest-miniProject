import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional, MinLength, IsEnum, isEnum } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  readonly name: string;
  
  @ApiProperty()
  @IsNumber()
  readonly age: number;
  
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsEnum(['admin','customer'])
  readonly role: 'admin'|'customer'; 
}
