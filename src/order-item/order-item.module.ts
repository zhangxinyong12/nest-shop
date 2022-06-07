import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItemController } from './order-item.controller';
import { OrderItem, OrderItemSchema } from './schemas/orderItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
  ],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
