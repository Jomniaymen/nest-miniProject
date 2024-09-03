import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateuserDTO } from './dto/updateuser.dto ';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

// Mock data
const mockUser = {
  _id: 'someUserId',
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password',
  age: 30,
  role: 'admin',
};

const mockUserDto: UserDto = {
  name: 'New User',
  email: 'newuser@example.com',
  password: 'newpassword',
  age: 25,
  role: 'customer',
};

const mockUpdateUserDto: UpdateuserDTO = {
  name: 'Updated User',
  email: 'updateduser@example.com',
  
};

const mockUsersService = {
  createnewuser: jest.fn().mockResolvedValue(mockUser),
  readuser: jest.fn().mockResolvedValue(mockUser),
  readalluser: jest.fn().mockResolvedValue([mockUser]),
  Update: jest.fn().mockResolvedValue(mockUser),
  deleteuser: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
     
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: jest.fn(() => true), 
      })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true), 
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNewUser', () => {
    it('should create a new user', async () => {
      const result = await controller.createNewUser(mockUserDto);
      expect(result).toEqual(mockUser);
      expect(service.createnewuser).toHaveBeenCalledWith(mockUserDto);
    });
  });

  describe('findUser', () => {
    it('should return a user by id', async () => {
      const result = await controller.findUser('someUserId');
      expect(result).toEqual(mockUser);
      expect(service.readuser).toHaveBeenCalledWith('someUserId');
    });

  
      
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const result = await controller.findAllUsers();
      expect(result).toEqual([mockUser]);
      expect(service.readalluser).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update a user by id', async () => {
      const result = await controller.updateUser(mockUpdateUserDto, 'someUserId');
      expect(result).toEqual(mockUser);
      expect(service.Update).toHaveBeenCalledWith('someUserId', mockUpdateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      const result = await controller.deleteUser('someUserId');
      expect(result).toEqual(mockUser);
      expect(service.deleteuser).toHaveBeenCalledWith('someUserId');
    });
  });
});
