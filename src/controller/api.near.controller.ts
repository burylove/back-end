import {Body, Controller, Get, Inject, Post, Query} from '@midwayjs/decorator';
import {generate_account, generate_key, query_near_account_balance, transfer_near} from "../chain/near";
import {Context} from "@midwayjs/koa";
import {Web2UsersService} from '../service/web2.user.service';
import {NearUsersService} from "../service/near.user.service";
import {
  pet_box_info,
  pet_eggs_info,
  pet_store_info,
  transfer_info,
  Web2UserAndKey,
  Web2UserKey
} from "../interface";
import {Web2UsersKey} from "../service/user.key.service";
import {NearUsersPetAssetService} from "../service/near.pet_asset.service";
import {NearUsersPetEggsAssetService} from "../service/near.pet_eggs_asset.service";
import {ADMIN_ADDRESS, ADMIN_KEY} from "../utils/admin_key";

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

  @Inject()
  nearUserPetAssetService: NearUsersPetAssetService;

  @Inject()
  nearUserPetEggsAssetService: NearUsersPetEggsAssetService;

  @Inject()
  nearUserInternalAssetService: NearUsersService;

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

  @Get('/query/near_internal_account_balance')
  async query_near_internal_account_balance(@Query() queryData): Promise<string> {
    const near_address:string = queryData.near_address;
    const result = await this.nearUserInternalAssetService.checkUserInternalBalance(near_address);
    return result;
  }

  @Get('/user/pet/all')
  async user_pet_all(@Query() input: pet_box_info) {
    const near_address = input.near_address;
    const result = await this.nearUserPetAssetService.findAllPet(near_address)
    return result;
  }

  @Get('/user/pet_eggs/all')
  async user_pet_eggs_all(@Query() input: pet_box_info) {
    const near_address = input.near_address;
    const result = await this.nearUserPetEggsAssetService.findAllPetEggs(near_address)
    return result;
  }

  @Get('/store/all_pet')
  async store_all_pet(@Query() input: pet_box_info) {
    const near_address = input.near_address;
    const result = await this.nearUserPetEggsAssetService.findAllPetEggs(near_address)
    return result;
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

  @Post('/user/open/pet_eggs')
  async user_open_pet_eggs(@Body() input: pet_box_info) {
    const near_address = input.near_address;
    const result = await this.nearUserPetAssetService.addUserPet(near_address)
    return result;
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
    await this.nearUserInternalAssetService.saveInternalUser(near_hex_account);
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
    if (result.transaction.receiver_id == 'c26017bdca4bb94ee8622c5bf9c4f4425bf4d0f0709b1e35a05e309764c20b8f'){
      const internal_result = this.nearUserInternalAssetService.addUserInternalBalance(near_address,amount)
      return internal_result
    }else{
      return result
    }
  }

  @Post('/admin/transfer/near')
  async admin_transfer_near(@Body() input: transfer_info) {
    const receiverId = input.receiverId;
    const amount = input.amount;
    const secretKey = ADMIN_KEY;
    const near_address = ADMIN_ADDRESS;
    const input_info = {
      near_address,
      secretKey,
      receiverId,
      amount
    };
    const result = await transfer_near(input_info);
    await this.nearUserService.DelUserInternalBalance(receiverId,amount)
    return result;
  }

  @Post('/generate/pet_eggs_box')
  async generate_pet_eggs_box(@Body() input: pet_eggs_info) {
    const near_address = input.near_address;
    const result = await this.nearUserPetEggsAssetService.addUserPetEggs(near_address)
    return result;
  }

  @Post('/user/sell/pet_store')
  async user_sell_pet_store(@Body() input: pet_store_info) {
    const near_pet_index = input.near_pet_index;
    const near_pet_price = input.near_pet_price;
    const result = await this.nearUserPetAssetService.addUserPetInStore(near_pet_index,near_pet_price)
    return result;
  }

  @Post('/user/buy/pet_store')
  async user_buy_pet_store(@Body() input: pet_store_info) {
    const near_pet_index = input.near_pet_index;
    const near_pet_price = input.near_pet_price;
    const result = await this.nearUserPetAssetService.buyUserPetInStore(near_pet_index,near_pet_price)
    return result;
  }
}
