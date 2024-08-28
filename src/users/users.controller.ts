import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

import { FilterUserDto } from './dto/filter.dto';
import { updateuserDTO } from './dto/updateuser.dto ';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice: UsersService) {}

    @Post('add')
    async createNewUser(@Body() dto: UserDto) {
        return await this.userservice.createnewuser(dto);
    }

    @Get(':id')
    async findUser(@Param('id') id: string) {
        return await this.userservice.readuser(id);
    }

    @Get()
    async findAllUsers() {
        return await this.userservice.readalluser();
    }

    @Put(':id')
    async updateUser(@Body() dto: updateuserDTO, @Param('id') id: string) {
        return await this.userservice.Update(id, dto);
    }

    @Delete('id')
    async deleteUser(@Param('id') id: string) {
        return await this.userservice.deleteuser(id);
    }

  
}
