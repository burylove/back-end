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

export interface pet_box_info {
  near_address:string;
}

export interface pet_eggs_info {
  near_address:string;
}

export interface Web2UserKey {
  key:string
}
