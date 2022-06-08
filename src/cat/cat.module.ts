import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from '../entity/cat.entity';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
