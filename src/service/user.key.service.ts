import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import {Key} from "../entity/key";
import { Repository } from 'typeorm';

@Provide()
export class Web2UsersKey {
  @InjectEntityModel(Key)
  usersModel: Repository<Key>;

  async findUsers(key:string) {
    const result = await this.usersModel.findOne({
      where: { key },
    });
    return result;
  }

  async addKey(key:string) {
    const user = new Key();
    user.key = key;
    // save entity
    const userResult = await this.usersModel.save(user);
    return userResult;
  }
}
