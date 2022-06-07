import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItemDocument } from './schemas/orderItem.schema';

@Controller('order-item')
export class OrderItemController {
  constructor(
    @InjectModel('OrderItem') private orderItemModel: Model<OrderItemDocument>,
  ) {}

  @Get('init')
  init() {
    const order = {
      order_id: '3',
      title: '商品3',
      price: 111,
      num: 100,
    };
    const data = new this.orderItemModel(order);
    return data
      .save()
      .then((res) => ({
        success: true,
        data: res,
      }))
      .catch((error) => ({
        success: false,
        msg: error,
      }));
  }

  @Get('find')
  async find() {
    // find 一个参数对象是条件 第二次参数返回字段
    const data = await this.orderItemModel
      .find({ _id: '629f642b50811d285418fcf5' }, 'title num')
      .exec();
    return {
      data,
    };
  }
}