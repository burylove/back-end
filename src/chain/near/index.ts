const toHex = require('to-hex')
import { generateSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from 'near-api-js';
import { connect, KeyPair, keyStores, utils } from 'near-api-js';


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
  const result = await account_info.sendMoney(
    input.receiverId, // receiver account
    input.amount // amount in yoctoNEAR
  );
  return result;
  // "1000000000000000000000000"
};

export {
  generate_key,
  generate_account,
  query_near_account_balance,
  transfer_near
}
