import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceUsage } from 'process';
import { NavEntity } from 'src/entity/nav.entity';
import { Repository } from 'typeorm';
import { AddNavParams, NavParams } from './nav.type';

@Injectable()
export class NavService {
  constructor(
    @InjectRepository(NavEntity)
    private navRepository: Repository<NavEntity>,
  ) {}

  async add(body: AddNavParams) {
    const data = await this.navRepository.find({
      where: { name: body.name },
    });
    if (!data) {
      const nav = new NavEntity();
      Object.keys(body).forEach((key) => {
        nav[key] = body[key];
      });
      return await this.navRepository.save(nav);
    } else {
      return {
        msg: '已经存在相同数据',
        data: body,
      };
    }
  }

  async find(query: NavParams) {
    const data = await this.navRepository.find({
      where: query,
    });
    return { data };
  }

  async updated(body) {
    const data = await this.navRepository.findOne({
      where: { id: body.id },
    });
    console.log('update data', body, data);

    if (data) {
      Object.keys(body).forEach((key) => {
        data[key] = body[key];
      });
      return await this.navRepository.save(data);
    } else {
      return {
        msg: '查询不到数据',
        data: body,
      };
    }
  }

  async remove(id) {
    const data = await this.navRepository.findOne({
      where: { id },
    });
    if (data) {
      return await this.navRepository.remove(data);
    } else {
      return {
        msg: 'id不存在',
        data: {
          id,
        },
      };
    }
    // return await this.navRepository.delete(id);
  }
}
