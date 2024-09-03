import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Signup', () => {
    it('should throw BadRequestException if email already used', async () => {
      const dto:UserDto = { name: 'aymen', email: 'aymen@gmail.com', password: 'password123', age: 30, role: 'admin' };
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(dto as any);
  
      await expect(authService.Signup(dto)).rejects.toThrow(BadRequestException);
    });
  
    it('should return user and access_token on successful signup', async () => {
      const dto:UserDto = { name: 'aymen', email: 'aymen@gmail.com', password: 'password123', age: 30, role: 'admin' };
      const hashedPassword = 'hashedPassword';
      const newUser = { ...dto, _id: 'someId', password: hashedPassword };
      const payload = { sub: newUser._id, name: newUser.name, role: newUser.role };
      const accessToken = 'accessToken';
  
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(newUser as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(accessToken);
  
      const result = await authService.Signup(dto);
  
      expect(result).toEqual({
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        access_token: accessToken,
      });
    });
  });
  describe('Signin', () => {
    it('should throw UnauthorizedException if email is wrong', async () => {
      const dto = { email: 'aymen@gmail.com', password: 'password123' };
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
  
      await expect(authService.Signin(dto)).rejects.toThrow(UnauthorizedException);
    });
  
    it('should throw UnauthorizedException if password is wrong', async () => {
      const dto = { email: 'aymen@gmail.com', password: 'wrongPassword' };
      const user = { email: dto.email, password: 'hashedPassword' };
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
  
      await expect(authService.Signin(dto)).rejects.toThrow(UnauthorizedException);
    });
  
    it('should return access_token and user on successful signin', async () => {
      const dto = { email: 'aymen@gmail.com', password: 'password123' };
      const user = { email: dto.email, password: 'hashedPassword', _id: 'someId' };
      const payload = { sub: user._id, role: 'user', password: user.password };
      const accessToken = 'accessToken';
  
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(accessToken);
  
      const result = await authService.Signin(dto);
  
      expect(result).toEqual({
        access_token: accessToken,
        user: {
          id: user._id,
          email: user.email,
          password: user.password,
        },
      });
    });
  });
  
});
