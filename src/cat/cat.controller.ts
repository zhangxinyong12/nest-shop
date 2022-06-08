import { Controller, Get } from '@nestjs/common';
import { CatEntity } from '../entity/cat.entity';
import { CatService } from './cat.service';
@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get('add')
  add() {
    const cat = new CatEntity();
    cat.age = 12;
    cat.name = 'zhangsan';
    cat.class = '1002';
    cat.phone = 1233333333;
    return this.catService.add(cat);
  }

  @Get('update')
  update() {
    return this.catService.update();
  }

  @Get('findAll')
  findAll() {
    return this.catService.findAll();
  }

  @Get('findOne')
  findOne() {
    return this.catService.findOne(1);
  }

  @Get('remove')
  remove() {
    return this.catService.remove(1);
  }
}
