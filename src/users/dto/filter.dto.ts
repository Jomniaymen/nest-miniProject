import { IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
    @IsOptional()
    @IsString()
    keyword?: string;
    
}