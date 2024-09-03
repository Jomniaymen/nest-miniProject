import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserDto } from '../src/users/dto/user.dto';
import { SigninDto } from '../src/users/dto/userSignin.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Test for user registration
  it('/autho/signup (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/autho/signup')
      .send({
        name: 'aymen',
        password: 'password',
        age: 23,
        email: 'aymenjomni@gmail.com',
        role: 'customer',
      })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
  
    expect(response.body).toHaveProperty('user');
  });
  it('/autho/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/autho/signin')
      .send({
        email: 'aymenjomni@gmail.com',
        password: 'password',
      })
      .expect(200);

    accessToken = response.body.accessToken;
    expect(response.body).toHaveProperty('accessToken');
 
    expect(response.body).toHaveProperty('user');
  });

  // Test for a protected endpoint using the access token
  it('/some/protected/endpoint (GET)', async () => {
    await request(app.getHttpServer())
      .get('/some/protected/endpoint')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
