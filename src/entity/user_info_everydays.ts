import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class User_info_everyDays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  username: string;

  @Column()
  learning_state: boolean;

  @Column()
  answer_times: number;

  @Column()
  answer_content: number;

  // @Column()
  // answer_content_question_list: Array<number>;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
