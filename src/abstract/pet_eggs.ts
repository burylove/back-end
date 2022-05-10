import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {near_pet_eggs_relation} from "./near_pet_eggs_relation";

export abstract class pet_eggs extends near_pet_eggs_relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  near_pet_eggs_index: number;

  @Column()
  near_pet_eggs_image_url:string;

  @Column()
  near_pet_eggs_type:string;
}

