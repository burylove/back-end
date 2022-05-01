import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_asset} from "../entity/near_pet_asset";
import {Pet_number} from "../entity/pet_number";
import {Uncommon_pet_random} from "../utils/random";

@Provide()
export class NearUsersPetAssetService {
  @InjectEntityModel(near_pet_asset)
  usersModel: Repository<near_pet_asset>;

  @InjectEntityModel(Pet_number)
  pet_number_Model: Repository<Pet_number>;

  async addUserPet(near_account: string ) {
    const user = new near_pet_asset();
    user.near_address = near_account;

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
    return userResult
  }

  async findAllPet(near_address:string) {
    const result = await this.usersModel.find({
      where: { near_address },
    });
    return result;
  }
}


