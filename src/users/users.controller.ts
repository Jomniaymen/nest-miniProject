import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

import { FilterUserDto } from './dto/filter.dto';
import { updateuserDTO } from './dto/updateuser.dto ';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.decorator';



@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly userservice: UsersService) {}
  
  
    @Post('add')
     @Roles('customer','admin')
    @UseGuards(RolesGuard)
    async createNewUser(@Body() dto: UserDto) {
        return await this.userservice.createnewuser(dto);
    }
    
    @Get(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    async findUser(@Param('id') id: string) {
        return await this.userservice.readuser(id);
    }

    @Get()
@Roles('admin')
@UseGuards(RolesGuard)
    async findAllUsers() {
        return await this.userservice.readalluser();
    }

    @Put(':id')
    @Roles('customer','admin')
    async updateUser(@Body() dto: updateuserDTO, @Param('id') id: string) {
        return await this.userservice.Update(id, dto);
    }

    @Delete(':id')
    @Roles('admin')
@UseGuards(RolesGuard)
    async deleteUser(@Param('id') id: string) {
        return await this.userservice.deleteuser(id);
    }

  
}
