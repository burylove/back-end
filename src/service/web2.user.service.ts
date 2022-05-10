import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Web2User } from '../entity/web2user';
import { Repository } from 'typeorm';
import { Web2UserEmail } from "../entity/web2useremail";

@Provide()
export class Web2UsersService {
  @InjectEntityModel(Web2User)
  usersModel: Repository<Web2User>;

  @InjectEntityModel(Web2UserEmail)
  usersEmailModel: Repository<Web2UserEmail>;

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

  async findUserNear(email:string){
    const result = await this.usersModel.find(
      {
        where:{email}
      }
    );
    return result;
  }

  async findUserCode(input:{ email:string; code:string; }){
    const email = input.email;
    const code  = input.code;
    const result = await this.usersEmailModel.findOneBy({
      email,
      code
    })
    if (result){
      await this.usersEmailModel.remove(result)
      return true
    }else{
      return false
    }
  }

  async addUserCode(input: { email:string; code:string;}){
    const user = new Web2UserEmail();
    user.email = input.email;
    user.code = input.code;
    const result = await this.usersEmailModel.save(user);
    console.log(result)
    setTimeout(async ()=>{    //10分钟后失效
      await this.usersEmailModel.remove(result)
    },1000*60*10)
  }
}
