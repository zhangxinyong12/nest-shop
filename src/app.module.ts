import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { NewsModule } from './news/news.module';
import { InitMiddleware } from './middleware/init.middleware';
import { NewsMiddleware } from './middleware/news.middleware';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [UserModule, UploadModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 中间件有执行顺序 全局=>顺序
    consumer
      .apply(InitMiddleware)
      .forRoutes('*')
      .apply(UserMiddleware)
      .forRoutes('user')
      .apply(NewsMiddleware)
      .forRoutes('news')
      .apply(NewsMiddleware, UserMiddleware)
      .forRoutes('upload');
  }
}
