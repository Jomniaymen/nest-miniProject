import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';


export  type UserDocument=User & Document;
@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  age: number;

  @ApiProperty()
  @Prop({ required: true, })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;
  
 @ApiProperty()
  @Prop({ enum: ['admin', 'customer'], default: 'customer' })
  role: 'admin' | 'customer';
}

export const UserSchema = SchemaFactory.createForClass(User);