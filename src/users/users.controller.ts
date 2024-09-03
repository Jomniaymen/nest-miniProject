import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';


import { UpdateuserDTO } from './dto/updateuser.dto ';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';


@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards( RolesGuard,JwtAuthGuard)
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
    async updateUser(@Body() dto:UpdateuserDTO, @Param('id') id: string) {
        return await this.userservice.Update(id, dto);
    }

    @Delete(':id')
    @Roles('admin')
@UseGuards(RolesGuard)
    async deleteUser(@Param('id') id: string) {
        return await this.userservice.deleteuser(id);
    }

  
}
