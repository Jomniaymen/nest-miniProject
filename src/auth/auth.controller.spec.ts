import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { SigninDto } from 'src/users/dto/userSignin.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    Signup: jest.fn(),
    Signin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should call AuthService.Signup with correct params', async () => {
      const dto: UserDto = {
          email: 'aymen@gmail.com',
          password: 'password123',
          name: 'test',
          age: 0,
          role: 'admin'
      };
      mockAuthService.Signup.mockResolvedValue({ message: 'User created' });

      const result = await authController.signup(dto);

      expect(result).toEqual({ message: 'User created' });
      expect(mockAuthService.Signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('signin', () => {
    it('should call AuthService.Signin with correct params', async () => {
      const signinDto: SigninDto = {
          email: 'aymen@gmail.com',
          password: 'password123',
        
      };
      mockAuthService.Signin.mockResolvedValue({ accessToken: 'some-jwt-token' });

      const result = await authController.signip(signinDto);

      expect(result).toEqual({ accessToken: 'some-jwt-token' });
      expect(mockAuthService.Signin).toHaveBeenCalledWith(signinDto);
    });
  });
});
