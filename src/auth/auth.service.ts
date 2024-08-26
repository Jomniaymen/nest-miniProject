
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
  async Signin(dto: UserDto)  {
    const {name ,email,password,age,role}=dto
  const check= await this.userModel.findOne({
    email});
    if(!check){
        throw new  UnauthorizedException('email wrong');
    }
 const passwordmatch=await bcrypt.hash(password,check.password);
 if(!passwordmatch){
    throw new  UnauthorizedException('password wrong');
}
 
 

  
  }
}
