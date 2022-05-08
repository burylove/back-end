import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {near_pet_relation} from "./near_pet_relation";

export abstract class pet extends near_pet_relation{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  near_pet_index: number;

  @Column()
  near_pet_name:string;

  @Column()
  near_pet_image_url:string;

  @Column()
  near_pet_type:string;

  @Column()
  near_pet_level:string;

  @Column()
  near_pet_birth_times:number;

  @Column()
  near_pet_hunger_value:number;

  @Column()
  near_pet_stamina_value:number;

  @Column()
  near_pet_health_value:number;

  @Column()
  near_pet_intelligence_value:number;

  @Column()
  near_pet_charisma_value:number;

  @Column()
  near_pet_lucky_value:number;

  @Column()
  near_pet_mint_number:number;
}

