import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Prop()
  order_id: string;

  @Prop()
  uid: number;

  @Prop()
  trade_no: number;

  @Prop()
  all_price: number;

  @Prop()
  all_num: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
