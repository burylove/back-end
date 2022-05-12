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
  near_pet_eggs_index:number;
}

// export interface query_store_type {
//   type:string
// }

export interface pet_eggs_info {
  near_address:string;
  near_pet_eggs_index:number;
  near_pet_eggs_type:string;
  near_pet_eggs_price:string;
}

export interface pet_store_info {
  near_address:string;
  near_pet_index:number;
  near_pet_price:string;
}

export interface pet_info {
  near_address:string;
  near_pet_index:number;
  repair_data:number;
  near_pet_level:number;
}


export interface Web2UserKey {
  key:string
}

export interface Web2UserEmail {
  email:string
}

export interface user_swap_tokenA_to_usn {
  near_address:string;
  amount_in:string;
}

export interface user_swap_tokenA_to_usn_info {
  near_address:string;
  near_secretKey:string;
  amount_in:string;
}
