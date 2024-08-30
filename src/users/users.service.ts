import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from './user.schema';
import { Model, Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { updateuserDTO } from './dto/updateuser.dto ';
import { query } from 'express';
import { FilterUserDto } from './dto/filter.dto';


@Injectable()
export class UsersService {
  findById(sub: any) {
    throw new Error('Method not implemented.');
  }
constructor(@InjectModel(User.name) private usermodel:Model<User>){}
    async createnewuser(@Body() dto:UserDto){
        const newuser=await this.usermodel.create(dto)
        return newuser
    }
    async readuser( id:string){
        const finduser=await this.usermodel.findById(id)
        if (!finduser){
          throw new NotFoundException('user not foud')
        }
        return finduser
    }
    async readalluser(){
        return await this.usermodel.find()
     
       
    }
    async Update(id:string, dto:updateuserDTO){
        return await this.usermodel.findByIdAndUpdate(id,dto,{new:true})
       
    }
    async deleteuser(id:string){
        return await this.usermodel.findByIdAndDelete(id)
       
    }



}
