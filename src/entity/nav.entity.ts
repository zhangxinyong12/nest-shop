import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'nav',
})
export class NavEntity {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ comment: '名字', length: 10 })
  name: string;

  @Column({ type: 'varchar', comment: '图片链接地址', length: 200 })
  url: string;

  @Column({ type: 'enum', comment: '状态', enum: [0, 1], default: 1 })
  status: number;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: string;

  @UpdateDateColumn({ comment: '修改时间' })
  updateDate: string;
}
