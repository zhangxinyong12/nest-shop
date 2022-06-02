import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  // 单文件上传
  @Post('addImg')
  @UseInterceptors(FileInterceptor('file'))
  addImg(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(body);
    console.log(file);
    // 写入本地磁盘
    const writeStream = createWriteStream(
      join(__dirname, '../../public/img', `${Date.now()}-${file.originalname}`),
    );
    writeStream.write(file.buffer);
    return {
      msg: '图片添加成功',
    };
  }
  // 多文件上传
  @Post('addImgs')
  @UseInterceptors(FilesInterceptor('file'))
  addImgs(@Body() body, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(body);
    console.log(files);
    files.map((file) => {
      // 写入本地磁盘
      const writeStream = createWriteStream(
        join(
          __dirname,
          '../../public/img',
          `${Date.now()}-${file.originalname}`,
        ),
      );
      writeStream.write(file.buffer);
    });

    return {
      msg: '图片添加成功',
    };
  }
}
