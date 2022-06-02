import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('init 中间件', req.baseUrl);

    next();
  }
}
