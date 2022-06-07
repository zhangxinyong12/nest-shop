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
    // find 一个参数对象是条件 第二次参数返回字段
    const data = await this.orderModel
      .aggregate([
        {
          $lookup: {
            from: 'orderitems', // 关联的表
            localField: 'order_id', // order表的某个字段
            foreignField: 'order_id', // order_item表中的某个字段
            as: 'items', // order_item查询数据的放置字段
          },
        },
        // 还可以继续关联其他表
        // {},
        // 过滤条件
        // {
        //   $match: {
        //     uid: {
        //       // $lt: 102,
        //       $lte: 102,
        //     },
        //   },
        // },
      ])
      // .skip(5) // 跳过
      // .limit(2) // 最大
      .sort({ uid: 1 }); // sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。
    return {
      data,
      status: 200,
    };
  }
}
