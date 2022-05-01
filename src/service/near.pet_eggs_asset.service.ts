import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_eggs_asset} from "../entity/near_pet_eggs_asset";
import {Pet_eggs_number} from "../entity/pet_eggs_number";

@Provide()
export class NearUsersPetEggsAssetService {
  @InjectEntityModel(near_pet_eggs_asset)
  usersModel: Repository<near_pet_eggs_asset>;

  @InjectEntityModel(Pet_eggs_number)
  pet_eggs_number_Model: Repository<Pet_eggs_number>;

  async addUserPetEggs(near_account: string ) {
    const user = new near_pet_eggs_asset();
    user.near_address = near_account;

    const pet_eggs_number_result = await this.pet_eggs_number_Model.findOne({
      where: { network:"near" },
    });
    user.near_pet_eggs_index = pet_eggs_number_result.pet_eggs_number
    user.near_pet_eggs_name = 'able'
    user.near_pet_eggs_image_url = 'https://cdn.discordapp.com/attachments/876498266550853642/969892589669072926/2b589afe10e09b84.png'
    user.near_pet_eggs_type = 'normal'
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
}


