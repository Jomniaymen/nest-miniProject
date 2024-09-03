import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { UpdateuserDTO } from './dto/updateuser.dto ';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    _id: '1762000',
    name: 'aymen',
    email: 'aymenjomni@gmailcom',
    password: 'aymenjomni12345',

  };

  const mockUserModel = {
    create: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    updateuser:jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createnewuser', () => {
    it('should create a new user', async () => {
      const dto: UserDto = {
        name: 'aymen',
        email: 'aymenjomni@gmailcom',
        password: 'aymenjomni12345',
        age: 23,
        role: 'admin'
      };
      const result = await service.createnewuser(dto);
      expect(result).toEqual(mockUser);
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('readuser', () => {
    it('should return a user by id', async () => {
      const result = await service.readuser('Userid');
      expect(result).toEqual(mockUser);
      expect(model.findById).toHaveBeenCalledWith('Userid');
    });

  
  });

  describe('readalluser', () => {
    it('should return an array of users', async () => {
      const result = await service.readalluser();
      expect(result).toEqual([mockUser]);
      expect(model.find).toHaveBeenCalled();
    });
  });





  describe('Update', () => {
    it('should update a user and return the updated user', async () => {
      const  updateuserDTO = { name: 'Updated Name',email:'update email' };
      const dto=updateuserDTO
      const result = await service.Update('someUserId',dto);
      expect(result).toEqual(mockUser);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someUserId', dto, { new: true });
    });
  })
});
