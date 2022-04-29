export interface IUserOptions {
  uid: number;
  url: string;
}

export interface Web2UserAndKey {
  description?:string;
  email: string;
  publicKey:string;
  secretKey:string;
}

export interface transfer_info {
  near_address:string;
  receiverId:string;
  amount:string;
}

export interface Web2UserKey {
  key:string
}
