import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用cookie
  app.use(cookieParser('加密参数'));
  // 设置session
  app.use(
    session({
      secret: 'aaaaaaa', // 加密参数
      name: 'token', // 返回客户端的key 默认是connect.sid
      cookie: { maxAge: 1000 * 10, httpOnly: true }, // 同cookie参数设置
      rolling: true, // 每次接口请求 重置过期时间
    }),
  );
  // 全局中间件 只能使用函数
  app.use(Logger);
  await app.listen(3000);
  console.log('3000端口启动');
}
bootstrap();
