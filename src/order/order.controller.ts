import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';

@Controller('order')
export class OrderController {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  @Get('init')
  init() {
    const order = {
      order_id: '3',
      uid: 103,
      trade_no: 1113,
      all_price: 1003,
      all_num: 23,
    };
    const data = new this.orderModel(order);
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
    const data = await this.orderModel.aggregate([
      {
        $lookup: {
          from: 'order_item',
          localField: 'order_id',
          foreignFiled: 'order_id',
          as: 'items',
        },
      },
      // {
      //   // $match: {
      //   //   all_price: { $gte: 90 },
      //   // },
      // },
    ]);
    return { data };
  }
}
