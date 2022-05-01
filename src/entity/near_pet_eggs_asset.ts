import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {pet_eggs} from "../abstract/pet_eggs";


@EntityModel()
export class near_pet_eggs_asset extends pet_eggs{

  @Column()
  near_address: string;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
