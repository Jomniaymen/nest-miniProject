import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.DATABASE_URL),ProductsModule, AuthModule, UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

