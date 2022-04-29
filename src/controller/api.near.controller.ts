import {Body, Controller, Get, Inject, Post, Query} from '@midwayjs/decorator';
import {generate_account, generate_key, query_near_account_balance, transfer_near} from "../chain/near";
import {Context} from "@midwayjs/koa";
import {Web2UsersService} from '../service/web2.user.service';
import {NearUsersService} from "../service/near.user.service";
import {transfer_info, Web2UserAndKey, Web2UserKey} from "../interface";
import {Web2UsersKey} from "../service/user.key.service";

@Controller('/api/near')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  web2UserKeyService: Web2UsersKey;

  @Inject()
  web2UserService: Web2UsersService;

  @Inject()
  nearUserService: NearUsersService;



  @Get('/query/near_account_balance')
  async query_near_account_balance(@Query() queryData): Promise<string> {
    const near_address:string = queryData.near_address;
    const info = await this.nearUserService.findSecretKey(near_address);
    const secretKey:string = info.secretKey;
    const input = {
      near_address,
      secretKey
    };
    const result = await query_near_account_balance(input)
    return `${result}`;
  }

  @Post('/add_web2_user_key')
  async add_web2_user_key(@Body() input:Web2UserKey) {
    const key = input.key;
    const result = await this.web2UserKeyService.addKey(key)
    return result;
  }

  @Post('/generate/near_seedPhrase')
  async near_seedPhrase(@Body() input:Web2UserKey) {
    const key = input.key;
    const key_result = await this.web2UserKeyService.findUsers(key)
    if (key_result){
      const near_key = generate_key();
      return near_key;
    }else{
      return "no key"
    }
  }


  @Post('/generate/near_user')
  async generate_user_near_user(@Body() input: Web2UserAndKey) {
    const near_publicKey = input.publicKey;
    const near_secretKey = input.secretKey;
    const near_hex_account = generate_account(near_publicKey);
    const near_input = {
      near_hex_account,
      near_publicKey,
      near_secretKey
    };
    await this.nearUserService.saveUser(near_input)
    const username = "david";
    const description = input.description;
    const email = input.email;
    const user_input = {
      username,
      description,
      email,
      near_hex_account
    };
    await this.web2UserService.saveUser(user_input);
    return near_hex_account;
  }

  @Post('/user/transfer/near')
  async user_transfer_near(@Body() input: transfer_info) {
    const near_address = input.near_address;
    const receiverId = input.receiverId;
    const amount = input.amount;
    const info = await this.nearUserService.findSecretKey(near_address);
    const secretKey = info.secretKey;
    const input_info = {
      secretKey,
      near_address,
      receiverId,
      amount
    };
    const result = await transfer_near(input_info)
    return result;
  }
}
