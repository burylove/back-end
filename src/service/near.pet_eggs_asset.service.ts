import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_eggs_asset} from "../entity/near_pet_eggs_asset";
import {Pet_eggs_number} from "../entity/pet_eggs_number";
import {Uncommon_pet_random} from "../utils/random";
import {near_pet_eggs_store} from "../entity/near_pet_eggs_store";

@Provide()
export class NearUsersPetEggsAssetService {
  @InjectEntityModel(near_pet_eggs_asset)
  usersModel: Repository<near_pet_eggs_asset>;

  @InjectEntityModel(Pet_eggs_number)
  pet_eggs_number_Model: Repository<Pet_eggs_number>;

  @InjectEntityModel(near_pet_eggs_store)
  pet_eggs_store_Model: Repository<near_pet_eggs_store>;


  async addUserPetEggs(near_account: string ) {
    const user = new near_pet_eggs_asset();
    user.near_address = near_account;

    const pet_eggs_number_result = await this.pet_eggs_number_Model.findOne({
      where: { network:"near" },
    });
    const type = await Uncommon_pet_random()
    user.near_pet_eggs_index = pet_eggs_number_result.pet_eggs_number
    user.near_pet_eggs_name = 'able'
    user.near_pet_eggs_image_url = 'https://cdn.discordapp.com/attachments/876498266550853642/970292528224038952/12.png'
    user.near_pet_eggs_type = type
    // save entity
    const userResult = await this.usersModel.save(user);
    pet_eggs_number_result.pet_eggs_number ++
    await this.pet_eggs_number_Model.save(pet_eggs_number_result);
    // save success
    return userResult
  }

  async findAllPetEggs(near_address:string) {
    const result = await this.usersModel.find({
      where: { near_address },
    });
    return result;
  }

  async findAllASCStorePetEggs() {
    const result = await this.pet_eggs_store_Model.createQueryBuilder('store')
      .orderBy('store.near_pet_eggs_price','ASC')
      .skip(0)
      .take(6)
      .getMany()
    return result;
  }

  async findAllDESCStorePetEggs() {
    const result = await this.pet_eggs_store_Model.createQueryBuilder('store')
      .orderBy('store.near_pet_eggs_price','DESC')
      .skip(0)
      .take(6)
      .getMany()
    return result;
  }
}


