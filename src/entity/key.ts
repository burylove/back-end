import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

@EntityModel()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
