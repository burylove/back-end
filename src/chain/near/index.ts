import {POOLID, SWAP_CONTRACT, TOKENA_CONTRACT, USN_CONTRACT} from "../../utils/contract";

const toHex = require('to-hex')
import { generateSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from 'near-api-js';
import { connect, KeyPair, keyStores, utils } from 'near-api-js';
import {ADMIN_ADDRESS, ADMIN_KEY} from "../../utils/admin_key";


const generate_key = () =>{
  const seedPhrase = generateSeedPhrase();
  return seedPhrase;
};

const generate_account = ( publicKey: string) =>{
  const account = nearAPI.utils.PublicKey.fromString(publicKey).data;
  return toHex(account);
};


const query_near_account_balance = async (input: { secretKey: string; near_address: string }) =>{
  const account = input.near_address;
  const keyPair = KeyPair.fromString(input.secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const account_balance = await account_info.getAccountBalance().then(
    (account)=>{
      const amountInNEAR = utils.format.formatNearAmount(account.available);
      return amountInNEAR;
    }
  ).catch(error =>{
    const amountInNEAR = '0'
    return amountInNEAR;
    }
  );
  return account_balance
};

const query_near_usn_account_balance = async (input: { near_address: string; secretKey: string; }) =>{
  const account = input.near_address;
  const keyPair = KeyPair.fromString(input.secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const contract_ft = new nearAPI.Contract(
    account_info, // the account object that is connecting
    'usdn.testnet',
    {
      changeMethods: [''],
      // name of contract you're connecting to
      viewMethods: ['ft_balance_of'], // view methods do not change state but usually return a value
      // changeMethods: ['addMessage'], // change methods modify state
      // sender: account_info // account object to initialize and sign transactions.
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await contract_ft.ft_balance_of({ account_id: account });
  return response
};

const query_near_tokenA_account_balance = async (input: { near_address: string; secretKey: string; }) =>{
  const account = input.near_address;
  const keyPair = KeyPair.fromString(input.secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const contract_ft = new nearAPI.Contract(
    account_info, // the account object that is connecting
    'dev-1651721707474-21284748210345',
    {
      changeMethods: [''],
      // name of contract you're connecting to
      viewMethods: ['ft_balance_of'], // view methods do not change state but usually return a value
      // changeMethods: ['addMessage'], // change methods modify state
      // sender: account_info // account object to initialize and sign transactions.
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await contract_ft.ft_balance_of({ account_id: account });
  return response
};

const transfer_near = async (input: { secretKey: string; near_address: string; receiverId:string; amount:string }) =>{
  const account = input.near_address;
  const keyPair = KeyPair.fromString(input.secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const near_amount = utils.format.parseNearAmount(input.amount);
  const result = await account_info.sendMoney(
    input.receiverId, // receiver account
    near_amount // amount in yoctoNEAR
  );
  return result;
  // "1000000000000000000000000"
};

const swap_tokena_to_usn = async (input: { data_near_address: string; data_amount_in: string; data_near_secretKey: string }) =>{
  const account = input.data_near_address;
  const keyPair = KeyPair.fromString(input.data_near_secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const contract = new nearAPI.Contract(
    account_info, // the account object that is connecting
    SWAP_CONTRACT,
    {
      changeMethods: [],
      viewMethods: ['get_return'],
    },
  );
  const contract_ft = new nearAPI.Contract(
    account_info,
    TOKENA_CONTRACT,
    {
      changeMethods: ['ft_transfer_call'],
      viewMethods: [''],
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = await contract.get_return({
    pool_id: POOLID ,
    token_in: TOKENA_CONTRACT,
    amount_in: input.data_amount_in,
    token_out: USN_CONTRACT,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await contract_ft.ft_transfer_call(
    {
      amount:input.data_amount_in,
      msg: `{\"force\":0,\"actions\":[{\"pool_id\":${POOLID},\"token_in\":\"${TOKENA_CONTRACT}\",\"token_out\":\"${USN_CONTRACT}\",\"amount_in\":\"${input.data_amount_in}\",\"min_amount_out\":\"${data}\"}]}`,
      receiver_id: SWAP_CONTRACT,
    },
    '300000000000000', // attached GAS (optional)
    '1', // attached deposit in yoctoNEAR (optional)
  );
  return response;
};

const swap_tokena_to_usn_number = async (input: { data_near_address: string; data_amount_in: string; data_near_secretKey: string }) =>{
  const account = input.data_near_address;
  const keyPair = KeyPair.fromString(input.data_near_secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const contract = new nearAPI.Contract(
    account_info, // the account object that is connecting
    SWAP_CONTRACT,
    {
      changeMethods: [],
      viewMethods: ['get_return'],
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = await contract.get_return({
    pool_id: POOLID ,
    token_in: TOKENA_CONTRACT,
    amount_in: input.data_amount_in,
    token_out: USN_CONTRACT,
  });
  return data;
};

const mint_near_pet_nft = async (near_address:string,near_pet_index:number) =>{
  const account = ADMIN_ADDRESS;
  const keyPair = KeyPair.fromString(ADMIN_KEY);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey('testnet', account, keyPair);
  // const RPC_API_ENDPOINT = 'https://rpc.testnet.near.org/';
  // const API_KEY = 'a9955b08-6f5e-4d8a-8684-12eaf47c278a';
  const RPC_API_ENDPOINT = 'https://public-rpc.blockpi.io/http/near-testnet';
  const API_KEY = '29e93a93a9868bb25fadf2f5cf19848ca87b31797f963b314b462cbb79dc32ea';
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { 'x-api-key': API_KEY },
  };
  const near = await connect(config);
  const account_info = await near.account(account);
  const contract = new nearAPI.Contract(
    account_info, // the account object that is connecting
    'dev-1652003970462-81082982884543',
    {
      changeMethods: ['nft_mint'],
      // name of contract you're connecting to
      viewMethods: [''], // view methods do not change state but usually return a value
      // changeMethods: ['addMessage'], // change methods modify state
      // sender: account_info // account object to initialize and sign transactions.
    },
  );

  // @ts-ignore
  const response = await contract.nft_mint(
    {
      token_id:near_pet_index.toString(),
      token_owner_id:near_address,
      token_metadata: {
        title:near_pet_index.toString(),
        description: '',
        media: 'https://cdn.discordapp.com/attachments/876498266550853642/969892589354512394/72fb26297978255e.png',
        media_hash: null,
        copies: null,
        issued_at: null,
        expires_at: null,
        starts_at: null,
        updated_at: null,
        extra: null,
        reference: null,
        reference_hash: null,
      },
    },
    '300000000000000', // attached GAS (optional)
    '10000000000000000000000', // attached deposit in yoctoNEAR (optional)
  );
  console.log(response);
}



export {
  generate_key,
  generate_account,
  query_near_account_balance,
  query_near_usn_account_balance,
  query_near_tokenA_account_balance,
  transfer_near,
  swap_tokena_to_usn,
  swap_tokena_to_usn_number,
  mint_near_pet_nft
}
