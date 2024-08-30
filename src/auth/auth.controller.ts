import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.schema';
import { SigninDto } from 'src/users/dto/userSignin.dto';
import { Public } from './public.decorator';

@Controller('autho')
export class AuthController {
constructor(private readonly authService:AuthService){}
@Public()
@Post('signup')
async  signup(@Body() dto:UserDto){
    return this.authService.Signup(dto);
}
@Public()
@Post('signin')
async signip(@Body() dtosign:SigninDto){
    return  this.authService.Signin(dtosign);


}

}