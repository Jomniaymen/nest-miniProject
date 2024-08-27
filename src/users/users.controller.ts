import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { domainToASCII } from 'url';
import { updateuserDTO } from './dto/updateuser.dto ';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice:UsersService){}

@Post('add')
async createnewuser(@Body() dto:UserDto){
    return await this.userservice.createnewuser(dto)
}
@Get(':id')
async finduser(@Param('id') id:string){
    return await this.userservice.readuser(id)
}


@Get()
async findalluser(){
    return await this.userservice.readalluser()
}
@Put(':id')
async updateuser(@Body() dto:updateuserDTO, @Param('id') id:string){
    return await this.userservice.Update(id,dto)
}
@Delete (':id')
async Deleteuser( @Param('id') id:string){
    return await this.userservice.deleteuser(id)
}
}
