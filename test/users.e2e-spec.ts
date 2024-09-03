import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RolesGuard } from '../src/common/guards/roles.guard';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';


describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userrole: string = "admin";
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: () => true,
    })
    .overrideGuard(RolesGuard)
    .useValue({
      canActivate: () => true,
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });



  it('should create a new user', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQxNzNmZmQ3ODYxYWJjNjgyZDAyMjIiLCJyb2xlIjoiY3VzdG9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCR0Y1BtdHVHWS41Q3RrTHAuL1Jlajl1Z01IWFQ4eU1Ob0dxaTk2eUlQdjUxeXI4VnltNndwNiIsImlhdCI6MTcyNTM0OTQwOSwiZXhwIjoxNzI1MzUzMDA5fQ.T17FBc4YlTyWkjpnGoPMtlpYStVFadw_CqiRiknTPeM'; 
  
    return request(app.getHttpServer())
      .post('/users/add')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        name: 'aymen',
        password: '1762000',
        age: 23,
        email: 'aymenjomni@gmail.com',
        role: 'admin',
      })
      .expect(201);
  });

  it('/users (GET)', async () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQxNzNmZmQ3ODYxYWJjNjgyZDAyMjIiLCJyb2xlIjoiY3VzdG9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCR0Y1BtdHVHWS41Q3RrTHAuL1Jlajl1Z01IWFQ4eU1Ob0dxaTk2eUlQdjUxeXI4VnltNndwNiIsImlhdCI6MTcyNTM0OTQwOSwiZXhwIjoxNzI1MzUzMDA5fQ.T17FBc4YlTyWkjpnGoPMtlpYStVFadw_CqiRiknTPeM'; 

    const response = await request(app.getHttpServer())
      .get('/users')
       .set('userrole', userrole)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200); 

    expect(response.body).toBeInstanceOf(Array); 
  });

  
});
