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
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserPipe } from 'src/pipe/user.pipe';
import { UserService } from './user.service';
import * as Joi from 'joi';
import { FindUserPipe } from 'src/pipe/find-user.pipe';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { UserDto } from 'src/dto/user.dto';
import { UserGuard } from 'src/guard/user.guard';

const rootInfo = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().integer().min(6).max(66).required(),
});
@Controller('user')
@UseGuards(UserGuard)
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
      maxAge: 1000 * 60 * 60,
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

  // 设置session
  @Get('setSession')
  setSession(@Req() req) {
    req.session.tooken = 'aaaaaaaaaa';
    return {
      data: '设置session成功过',
    };
  }

  // 获取session
  @Get('getSession')
  getSession(@Req() req) {
    console.log(req.session);

    return {
      session: req.session.tooken,
    };
  }

  // // 测试管道 pipe
  // @Get('testPipe')
  // testPipe(@Query('id', ParseIntPipe) query) {
  //   return {
  //     ...query,
  //   };
  // }
  // 测试管道 自定义 pipe
  @Get('testPipe')
  @UsePipes(new FindUserPipe(rootInfo))
  testPipe(@Query() query) {
    return {
      ...query,
    };
  }

  // 使用dto校验
  @Get('testDtoPipe')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  testDtoPipe(@Query() userDto: UserDto) {
    return {
      ...userDto,
    };
  }
}
