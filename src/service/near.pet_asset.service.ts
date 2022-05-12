import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_asset} from "../entity/near_pet_asset";
import {Common_pet_random, Epic_pet_random, Rare_pet_random, Uncommon_pet_random} from "../utils/random";
import {near_pet_store} from "../entity/near_pet_store";
import {near_pet_eggs_asset} from "../entity/near_pet_eggs_asset";
import {
  Common_Attributes_random,
  Epic_Attributes_random, Legendary_Attributes_random,
  Rare_Attributes_random,
  Uncommon_Attributes_random
} from "../utils/attributes";

@Provide()
export class NearUsersPetAssetService {
  @InjectEntityModel(near_pet_asset)
  usersModel: Repository<near_pet_asset>;

  @InjectEntityModel(near_pet_store)
  pet_store_Model: Repository<near_pet_store>;

  @InjectEntityModel(near_pet_eggs_asset)
  usersEggsModel: Repository<near_pet_eggs_asset>;

  async addUserPet(near_address: string,near_pet_eggs_index:number ) {
    const user = new near_pet_asset();
    user.near_address = near_address;
    //remove
    const user_eggs_info = await this.usersEggsModel.findOneBy({
      near_address,
      near_pet_eggs_index,
    });

    const add_pet = async (type:string,intelligence:number,charisma:number,healthy:number,lucky:number) =>{
      await this.usersEggsModel.remove(user_eggs_info);
      user.near_pet_index = near_pet_eggs_index;
      user.near_pet_image_url = 'https://cdn.discordapp.com/attachments/876498266550853642/969892589669072926/2b589afe10e09b84.png';
      user.near_pet_type = type;
      user.near_pet_level = '0';
      user.near_pet_birth_times = 0;
      user.near_pet_hunger_value = 100;
      user.near_pet_stamina_value = 0;
      user.near_pet_health_value = healthy;
      user.near_pet_intelligence_value = intelligence;
      user.near_pet_charisma_value = charisma;
      user.near_pet_lucky_value = lucky;
      user.near_pet_mint_number = 10;
      user.near_pet_parents_1 = '';
      user.near_pet_parents_2 = '';
      user.near_pet_child_1 = '';
      user.near_pet_child_2 = '';
      user.near_pet_child_3 = '';
      user.near_pet_child_4 = '';
      user.near_pet_child_5 = '';
      user.near_pet_child_6 = '';
      user.near_pet_child_7 = '';
      user.near_pet_child_8 = '';
      user.near_pet_child_9 = '';
      user.near_pet_child_10 = '';
      // save entity
      const userResult = await this.usersModel.save(user);
      return userResult
    }

    const eggs_type = user_eggs_info.near_pet_eggs_type;

    if (eggs_type == 'Common'){
      const type = Common_pet_random();
      const intelligence = Common_Attributes_random()
      const charisma = Common_Attributes_random()
      const healthy = Common_Attributes_random()
      const lucky = Common_Attributes_random()
      const userResult = await add_pet(type,intelligence,charisma,healthy,lucky);
      return userResult;
    }else if(eggs_type == 'Uncommon'){
      const type = Uncommon_pet_random();
      const intelligence = Uncommon_Attributes_random()
      const charisma = Uncommon_Attributes_random()
      const healthy = Uncommon_Attributes_random()
      const lucky = Uncommon_Attributes_random()
      const userResult = await add_pet(type,intelligence,charisma,healthy,lucky);
      return userResult;
    }else if(eggs_type == 'Rare'){
      const type = Rare_pet_random();
      const intelligence = Rare_Attributes_random()
      const charisma = Rare_Attributes_random()
      const healthy = Rare_Attributes_random()
      const lucky = Rare_Attributes_random()
      const userResult = await add_pet(type,intelligence,charisma,healthy,lucky);
      return userResult;
    }else if(eggs_type == 'Epic'){
      const type = Epic_pet_random();
      const intelligence = Epic_Attributes_random()
      const charisma = Epic_Attributes_random()
      const healthy = Epic_Attributes_random()
      const lucky = Epic_Attributes_random()
      const userResult = await add_pet(type,intelligence,charisma,healthy,lucky);
      return userResult;
    }else{
      const type = 'Legendary';
      const intelligence = Legendary_Attributes_random()
      const charisma = Legendary_Attributes_random()
      const healthy = Legendary_Attributes_random()
      const lucky = Legendary_Attributes_random()
      const userResult = await add_pet(type,intelligence,charisma,healthy,lucky);
      return userResult;
    }
  }

  async addUserPetInStore(near_pet_index:number,near_pet_price:string) {
    const pet_result = await this.usersModel.findOne({
      where:{near_pet_index}
    });

    if (pet_result){
     const input_store_data = {
       ...pet_result,
       near_pet_price
     }
     const result = await this.pet_store_Model.save(input_store_data)
      await this.usersModel.remove(pet_result)
     return result
    }else{
      return "no data"
    };
  }

  async repairUserPet(near_address:string,near_pet_index:number,repair_data:number){
    const result = await this.usersModel.findOne(
      {
        where:{near_pet_index}
      }
    )
    if(near_address ==result.near_address){
      result.near_pet_hunger_value =Math.floor(result.near_pet_hunger_value+ Number(repair_data/0.41))
      await this.usersModel.save(result)
    }
    return result
  }

  async levelUserPet(near_address:string,near_pet_index:number,){
    const result = await this.usersModel.findOne(
      {
        where:{near_pet_index}
      }
    )
    if(near_address ==result.near_address){
      if(Number(result.near_pet_level) < 20){
        result.near_pet_level = (Number(result.near_pet_level) + 1).toString()
        await this.usersModel.save(result)
      }

    }
    return result
  }

  async removeUserPet(near_pet_index:number) {
    const pet_result = await this.usersModel.findOne({
      where:{near_pet_index}
    });
    if (pet_result){
      await this.usersModel.remove(pet_result)
      return 'success'
    }else{
      return "no data"
    };
  }

  async buyUserPetInStore(near_address:string,near_pet_index:number,near_pet_price:string) {
    const pet_result = await this.pet_store_Model.findOne({
      where:{near_pet_index}
    });
    if (near_pet_price == pet_result.near_pet_price){
      const user = new near_pet_asset();
      user.near_address = near_address;
      user.near_pet_index = pet_result.near_pet_index;
      user.near_pet_image_url = pet_result.near_pet_image_url;
      user.near_pet_type = pet_result.near_pet_type;
      user.near_pet_level = pet_result.near_pet_level;
      user.near_pet_birth_times = pet_result.near_pet_birth_times;
      user.near_pet_hunger_value = pet_result.near_pet_hunger_value;
      user.near_pet_stamina_value = pet_result.near_pet_stamina_value;
      user.near_pet_health_value = pet_result.near_pet_health_value;
      user.near_pet_intelligence_value = pet_result.near_pet_intelligence_value;
      user.near_pet_charisma_value = pet_result.near_pet_charisma_value;
      user.near_pet_lucky_value = pet_result.near_pet_lucky_value;
      user.near_pet_mint_number = pet_result.near_pet_mint_number;
      user.near_pet_parents_1 = pet_result.near_pet_parents_1;
      user.near_pet_parents_2 = pet_result.near_pet_parents_2;
      user.near_pet_child_1 = pet_result.near_pet_child_1;
      user.near_pet_child_2 = pet_result.near_pet_child_2;
      user.near_pet_child_3 = pet_result.near_pet_child_3;
      user.near_pet_child_4 = pet_result.near_pet_child_4;
      user.near_pet_child_5 = pet_result.near_pet_child_5;
      user.near_pet_child_6 = pet_result.near_pet_child_6;
      user.near_pet_child_7 = pet_result.near_pet_child_7;
      user.near_pet_child_8 = pet_result.near_pet_child_8;
      user.near_pet_child_9 = pet_result.near_pet_child_9;
      user.near_pet_child_10 = pet_result.near_pet_child_10;
      await this.usersModel.save(user);
      await this.pet_store_Model.remove(pet_result);
      return 'ok'
    }else{
      return "not enough money"
    }
  }

  async findOneUserPet(near_pet_index:number) {
    const result = await this.usersModel.findOne(
      {
        where:{near_pet_index}
      }
    )
    return result
  }

  async findOnePet(near_pet_index:number) {
    const result = await this.pet_store_Model.findOne(
      {
        where:{near_pet_index}
      }
    )
    return result
  }

  async findAllPet(near_address:string) {
    const result = await this.usersModel.find({
      where: { near_address },
    });
    return result;
  }

  async findAllASCStorePet() {
    const result = await this.pet_store_Model.createQueryBuilder('store')
      .orderBy('store.near_pet_price','ASC')
      .skip(0)
      .take(6)
      .getMany()
    return result;
  }

  async findAllDESCStorePet() {
    const result = await this.pet_store_Model.createQueryBuilder('store')
      .orderBy('store.near_pet_price','DESC')
      .skip(0)
      .take(6)
      .getMany()
    return result;
  }


}


