import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../src/common/guards/roles.guard';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const adminToken = 'your_admin_jwt_token_here'; 
  const customerToken = 'your_customer_jwt_token_here'; 
  let userId: string;

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

  it('should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/add')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'aymen',
        password: 'password',
        age: 23,
        email: 'aymenjomni@gmail.com',
        role: 'customer',
      })
      .expect(201);

    userId = response.body._id; // Assuming the response contains the user ID
  });

  it('should fetch a user by ID', async () => {
    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('age');
        expect(response.body).toHaveProperty('role');
      });
  });

  it('should fetch all users', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .then(response => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should update a user by ID', async () => {
    await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ age: 24 }) // Example update
      .expect(200);
  });

  it('should delete a user by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });

 

});
