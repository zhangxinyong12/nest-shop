import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用cookie
  app.use(cookieParser('加密参数'));
  await app.listen(3000);
  console.log('3000端口启动');
}
bootstrap();
