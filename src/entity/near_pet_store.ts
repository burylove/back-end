import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {pet} from "../abstract/pet";

@EntityModel()
export class near_pet_store extends pet{

  @Column()
  near_address: string;

  @Column()
  near_pet_price:string;

  @CreateDateColumn()
  create?: number;

  @UpdateDateColumn()
  update?: number;

  @VersionColumn()
  version?: number;
}
