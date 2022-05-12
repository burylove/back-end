import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class near_content_question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content_index: number;

  @Column()
  question: string;

  @Column()
  answer_1: string;

  @Column()
  answer_2: string;

  @Column()
  answer_3: string;

  @Column()
  answer_4: string;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
