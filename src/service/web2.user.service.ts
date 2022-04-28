import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Web2User } from '../entity/web2user';
import { Repository } from 'typeorm';

@Provide()
export class Web2UsersService {
  @InjectEntityModel(Web2User)
  usersModel: Repository<Web2User>;

  // save
  async saveUser(input: { near_hex_account: string; description: string; email: string; username: string }) {
    const user = new Web2User();
    user.username = input.username;
    user.description = input.description;
    user.email = input.email;
    user.near_address = input.near_hex_account;
    // save entity
    const userResult = await this.usersModel.save(user);
    // save success
    console.log(userResult);
  }
}
