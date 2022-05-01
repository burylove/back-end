import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { NearUser } from '../entity/near';
import { Repository } from 'typeorm';
import {near_internal_asset} from "../entity/near_internal_asset";

@Provide()
export class NearUsersService {
  @InjectEntityModel(NearUser)
  usersModel: Repository<NearUser>;

  @InjectEntityModel(near_internal_asset)
  usersInternalModel: Repository<near_internal_asset>;

  // save
  async saveUser(input: { near_hex_account: string; near_secretKey: string; near_publicKey: string }) {
    const user = new NearUser();
    user.near_address = input.near_hex_account;
    user.publicKey = input.near_publicKey;
    user.secretKey = input.near_secretKey;
    // save entity
    const userResult = await this.usersModel.save(user);
    // save success
    console.log(userResult);
  }

  async saveInternalUser(near_hex_account: string) {
    const user = new near_internal_asset();
    user.near_address = near_hex_account;
    user.near_balance = '0';
    // save entity
    const userResult = await this.usersInternalModel.save(user);
    // save success
    return userResult;
  }


  async findSecretKey(near_address:string) {
    const result = await this.usersModel.findOne({
      where: { near_address },
    });
    return result;
  }

  async addUserInternalBalance(near_address:string,balance:string) {
    const result = await this.usersInternalModel.findOne({
      where: { near_address },
    });
    result.near_balance = balance;
    const userResult = await this.usersInternalModel.save(result);
    return userResult;
  }
}


