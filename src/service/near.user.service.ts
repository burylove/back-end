import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { NearUser } from '../entity/near';
import { Repository } from 'typeorm';

@Provide()
export class NearUsersService {
  @InjectEntityModel(NearUser)
  usersModel: Repository<NearUser>;

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

  async findSecretKey(near_address:string) {
    const result = await this.usersModel.findOne({
      where: { near_address },
    });
    return result;
  }
}


