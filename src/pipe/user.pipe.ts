import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    value['pipe'] = '经过pipe处理的数据';
    return value;
  }
}
