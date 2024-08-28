import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/product.schema';


@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, default: () => new Date() })
  orderDate: Date;

  @Prop({ type: 
    [
       { productid:{ type: Types.ObjectId, ref: 'Product' },
           quantity:{type:Number}}
  ] })
  products:{Product:Types.ObjectId;quantity:Number}
}
export const OrderSchema = SchemaFactory.createForClass(Order);
