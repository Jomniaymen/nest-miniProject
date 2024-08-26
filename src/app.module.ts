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



@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.DATABASE_URI), AuthModule, UsersModule, OrdersModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
