import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_asset} from "../entity/near_pet_asset";
import {Pet_number} from "../entity/pet_number";
import {Uncommon_pet_random} from "../utils/random";
import {near_pet_store} from "../entity/near_pet_store";
import {near_pet_eggs_asset} from "../entity/near_pet_eggs_asset";

@Provide()
export class NearUsersPetAssetService {
  @InjectEntityModel(near_pet_asset)
  usersModel: Repository<near_pet_asset>;

  @InjectEntityModel(Pet_number)
  pet_number_Model: Repository<Pet_number>;

  @InjectEntityModel(near_pet_store)
  pet_store_Model: Repository<near_pet_store>;

  @InjectEntityModel(near_pet_eggs_asset)
  usersEggsModel: Repository<near_pet_eggs_asset>;

  async addUserPet(near_account: string,near_pet_eggs_index:number ) {
    const user = new near_pet_asset();
    user.near_address = near_account;
    //remove
    const user_eggs_info = await this.usersEggsModel.findOne({
      where:{ near_pet_eggs_index }
    });
    await this.usersEggsModel.remove(user_eggs_info);




    const pet_number_result = await this.pet_number_Model.findOne({
      where: { network:"near" },
    });
    const type = await Uncommon_pet_random()
    user.near_pet_index = pet_number_result.pet_number
    user.near_pet_name = 'able'
    user.near_pet_image_url = 'https://cdn.discordapp.com/attachments/876498266550853642/969892589669072926/2b589afe10e09b84.png'
    user.near_pet_type = type
    user.near_pet_level = '0'
    user.near_pet_birth_times = 0
    user.near_pet_hunger_value = 0
    user.near_pet_stamina_value = 0
    user.near_pet_health_value = 0
    user.near_pet_intelligence_value = 0
    user.near_pet_charisma_value = 0
    user.near_pet_lucky_value = 0
    // save entity
    const userResult = await this.usersModel.save(user);
    pet_number_result.pet_number ++
    await this.pet_number_Model.save(pet_number_result);
    // save success
    return userResult;
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

  async buyUserPetInStore(near_pet_index:number,near_pet_price:string) {
    const pet_result = await this.pet_store_Model.findOne({
      where:{near_pet_index}
    });

    if (near_pet_price == pet_result.near_pet_price){
      await this.usersModel.save(pet_result)
      await this.pet_store_Model.remove(pet_result)
      return 'ok'
    }else{
      return "not enough money"
    }
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


