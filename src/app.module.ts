import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { NewsModule } from './news/news.module';
import { InitMiddleware } from './middleware/init.middleware';
import { NewsMiddleware } from './middleware/news.middleware';
import { UserMiddleware } from './middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';

// 数据库基本配置
const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'rm-wz9i6arsb4631oj1e2o.mysql.rds.aliyuncs.com',
  port: 3306,
  username: 'zhang',
  password: 'WOziji123456',
  database: 'nest_shop',
  entities: ['dist/**/*.entity{.ts,.js}'],
  timezone: 'UTC',
  charset: 'utf8mb4',
  multipleStatements: true,
  dropSchema: false,
  synchronize: true, // 会自动同步创建数据库修改表结构 慎用 /** Invalid use of NULL value */
  logging: true,
  // autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MongooseModule.forRoot(
      'mongodb://zhang001:zhang123456@101.132.163.138:27017/nest_shop',
    ),
    UserModule,
    UploadModule,
    NewsModule,
    OrderModule,
    OrderItemModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 中间件有执行顺序 全局=>顺序
    // consumer
    //   .apply(InitMiddleware)
    //   .forRoutes('*')
    //   .apply(UserMiddleware)
    //   .forRoutes('user')
    //   .apply(NewsMiddleware)
    //   .forRoutes('news')
    //   .apply(NewsMiddleware, UserMiddleware)
    //   .forRoutes('upload');
  }
}
