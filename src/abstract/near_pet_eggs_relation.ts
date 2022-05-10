import {
  Column,
} from 'typeorm';

export abstract class near_pet_eggs_relation {
  @Column()
  near_pet_parents_1?: string;

  @Column()
  near_pet_parents_2?: string;
}

