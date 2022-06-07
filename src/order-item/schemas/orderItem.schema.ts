import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem extends Document {
  @Prop()
  order_id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  num: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
