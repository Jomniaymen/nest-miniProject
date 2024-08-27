import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { updateuserDTO } from './dto/updateuser.dto copy';


@Injectable()
export class UsersService {
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
