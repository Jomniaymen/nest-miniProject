import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from '../users/dto/userSignin.dto';
import { Public } from '../common/guards/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags('authentication ')  
@ApiBearerAuth('JWT-auth') 
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