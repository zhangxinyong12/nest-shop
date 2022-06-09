import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavEntity } from 'src/entity/nav.entity';
import { NavController } from './nav.controller';
import { NavService } from './nav.service';

@Module({
  imports: [TypeOrmModule.forFeature([NavEntity])],
  controllers: [NavController],
  providers: [NavService],
})
export class NavModule {}
