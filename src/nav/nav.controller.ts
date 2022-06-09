import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NavEntity } from 'src/entity/nav.entity';
import { NavService } from './nav.service';
import { AddNavParams, NavParams } from './nav.type';

@Controller('nav')
export class NavController {
  constructor(private navService: NavService) {}

  @Post('add')
  add(@Body() body: AddNavParams) {
    return this.navService.add(body);
  }

  @Get('find')
  find(@Query() query: NavParams) {
    return this.navService.find(query);
  }

  @Post('update')
  update(@Body() body: NavParams) {
    return this.navService.updated(body);
  }

  @Post('remove')
  remove(@Body('id') id: number) {
    return this.navService.remove(id);
  }
}
