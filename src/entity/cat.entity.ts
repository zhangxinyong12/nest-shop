import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cat',
})
export class CatEntity {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ comment: '名字' })
  name: string;

  @Column({ comment: '年龄' })
  age: number;

  @Column({ comment: '班级' })
  class: string;

  @Column({ comment: '手机号' })
  phone: number;
}
