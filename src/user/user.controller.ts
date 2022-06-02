import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private uservervice: UserService) {}
  @Get('list')
  getList(@Query() query) {
    return this.uservervice.find();
  }
  /**
   *
   * @param file formData 文件上传才使用的file参数
   * @param body
   * @returns
   */
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  add(@UploadedFile() file, @Body() body) {
    return {
      httpType: 'Post json',
      body,
      file,
    };
  }
  /**
   *
   * @param body json和x-www-form-urlencoded
   * @returns
   */
  @Post('addOther')
  addOther(@Body() body) {
    return {
      httpType: 'Post json',
      body,
    };
  }

  @Get('find/:id/:name')
  findId(@Param() param) {
    return {
      param,
    };
  }

  // passthrough:true 不用return res.send() 框架自动处理返回res
  @Get('setCookie')
  setCookie(@Res({ passthrough: false }) res: Response) {
    res.cookie('name', 'aaaaaaaaa', {
      signed: true, // signed 设置cookie加密
      httpOnly: true,
      maxAge: 1000 * 6,
    });
    return res.send({
      data: 'Cookie 设置成功',
    });
  }

  @Get('getCookie')
  getCookie(@Req() req: Request) {
    return {
      cookie: req.cookies, // 获取未加密的cookie
      signedCookies: req.signedCookies, // 获取加密后 cookie
    };
  }
}
