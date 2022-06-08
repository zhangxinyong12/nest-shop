import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from '../entity/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private CatRepository: Repository<CatEntity>,
  ) {}

  add(cat: CatEntity) {
    return this.CatRepository.save(cat);
  }

  async update(id?: number, cat?): Promise<CatEntity[] | any> {
    const data = await this.CatRepository.findOne({
      where: { id: 30 },
    });
    console.log(data);

    if (data) {
      data.name = '李四';
      return this.CatRepository.save(data);
    } else {
      return {
        msg: '找不到数据',
      };
    }
  }

  findAll(): Promise<CatEntity[]> {
    return this.CatRepository.find({
      where: {
        name: 'zhangsan',
      },
    });
  }

  findOne(id: number): Promise<CatEntity> {
    return this.CatRepository.findOne({ where: { name: 'zhangsan' } });
  }

  remove(id: number) {
    return this.CatRepository.delete(id);
  }
}
