import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
  PassportModule.register({      
        defaultStrategy: 'jwt',      
        property: 'user',      
        session: false,    
    }),    
],  
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
