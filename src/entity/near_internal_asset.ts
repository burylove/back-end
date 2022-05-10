import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn,
} from 'typeorm';

@EntityModel()
export class near_internal_asset {
  @PrimaryColumn()
  near_address: string;

  @Column()
  near_balance: string;

  @Column()
  game_token_balance: string;

  @Column()
  token_a_balance: string;

  @Column()
  token_b_balance: string;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
