
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/users/dto/userSignin.dto';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User> , private jwtService: JwtService) {}
  
  async Signup(dto: UserDto)  {
    const {name ,email,password,age,role}=dto
  const check= await this.userModel.findOne({
    email});
    if(check){
        throw new  BadRequestException('email already used');
    }
 const hashedpassword=await bcrypt.hash(password,10);
  const newuser=await this.userModel.create({
    name,
    email,
    age,
    password: hashedpassword,
    role, 
  });
 return newuser;

  }
  async Signin(dtosign:SigninDto)  {
    const {name ,email,password,role}=dtosign
  const check= await this.userModel.findOne({
    email});
    if(!check){
        throw new  UnauthorizedException('email wrong');
    }
 const passwordmatch=await bcrypt.compare(password,check.password);
 if(!passwordmatch){
    throw new  UnauthorizedException('password wrong');
}
const payload = { sub: check._id, name: check.name, role: check.role,password:check.password };
const access_token = await this.jwtService.signAsync(payload);
return {
  access_token,
  user: {
    id: check._id,
    name: check.name,
    email:check.email,
    password:check.password 
  },
  }
}
}