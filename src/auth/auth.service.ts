
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async Signup(dto: UserDto) {
    const { name, email, password, age, role } = dto;
  
    // Check if the email is already used
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already used');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new user
    const newUser = await this.userModel.create({
      name,
      email,
      age,
      password: hashedPassword,
      role,
    });
  
    // Return the created user information
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      role: newUser.role,
    };
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
