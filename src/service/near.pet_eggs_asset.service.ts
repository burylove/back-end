import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {near_pet_eggs_asset} from "../entity/near_pet_eggs_asset";
import {near_pet_eggs_store} from "../entity/near_pet_eggs_store";

@Provide()
export class NearUsersPetEggsAssetService {
  @InjectEntityModel(near_pet_eggs_asset)
  usersModel: Repository<near_pet_eggs_asset>;

  @InjectEntityModel(near_pet_eggs_store)
  pet_eggs_store_Model: Repository<near_pet_eggs_store>;




  async addUserPetEggs(near_account: string,near_pet_eggs_index:number,near_pet_eggs_type:string) {
    const user = new near_pet_eggs_asset();
    user.near_address = near_account;
    user.near_pet_eggs_index = near_pet_eggs_index;
    user.near_pet_eggs_image_url = 'https://cdn.discordapp.com/attachments/876498266550853642/970292528224038952/12.png';
    user.near_pet_eggs_type = near_pet_eggs_type;
    user.near_pet_parents_1 = '';
    user.near_pet_parents_2 = '';
    // save entity
    const userResult = await this.usersModel.save(user);
    // save success
    return userResult
  }

  async findOneEgg(near_pet_eggs_index:number) {
    const result = await this.usersModel.findOne(
      {
        where:{near_pet_eggs_index}
      }
    )
    return result
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


