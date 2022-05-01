import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class pet_eggs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  near_pet_eggs_index: number;

  @Column()
  near_pet_eggs_name:string;

  @Column()
  near_pet_eggs_image_url:string;

  @Column()
  near_pet_eggs_type:string;
}

