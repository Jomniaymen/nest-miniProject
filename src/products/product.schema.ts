import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  namepro: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;



 
  @Prop({
    type: [{ 
      orderid: { type: Types.ObjectId, ref: 'Order' }
    
    }],
    default: []
  })
  orders:{ orderid: Types.ObjectId};

}
export const ProductSchema = SchemaFactory.createForClass(Product);
