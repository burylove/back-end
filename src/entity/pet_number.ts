import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn,
} from 'typeorm';

@EntityModel()
export class Pet_number {
  @PrimaryColumn()
  network: string;

  @Column()
  pet_number:number;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
