import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  @Get('list')
  getList(@Query() query) {
    return {
      httpType: 'get',
      params: query,
    };
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
}
