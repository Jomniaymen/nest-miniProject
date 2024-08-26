import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.schema';

@Controller('autho')
export class AuthController {
constructor(private readonly authService:AuthService){}

@Post('signup')
async  signup(@Body() dto:UserDto){
    return this.authService.Signup(dto);
}

@Post('signin')
async signip(@Body() dto:UserDto){
    return  this.authService.Signin(dto);


}

}