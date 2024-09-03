import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';



@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, default: () => new Date() })
  orderDate: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId] , ref: 'Product'})
  products:mongoose.Types.ObjectId[]

  
}
export const OrderSchema = SchemaFactory.createForClass(Order);
