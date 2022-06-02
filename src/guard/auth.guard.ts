import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 返回true 代表有权限
    console.log('全局守卫。。');
    // 获取cookie session
    console.log(
      '守卫获取到的cookies',
      // context.switchToHttp().getRequest().cookies, //
      context.switchToHttp().getRequest().signedCookies, // signedCookies 获取加密后的cookies
    );
    console.log(
      '守卫获取到的session',
      context.switchToHttp().getRequest().session.tooken,
    );
    // return Math.random() > 0.5;
    return true;
  }
}
