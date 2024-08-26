import { IsString, IsEmail, IsNumber, IsOptional, MinLength, IsEnum, isEnum } from 'class-validator';

export class UserDto {

  @IsString()
  @MinLength(5)
  readonly name: string;

  @IsNumber()
  readonly age: number;
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsEnum(['admin','customer'])
  readonly role: 'admin'|'customer'; 
}
