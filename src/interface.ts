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

export interface Web2UserKey {
  key:string
}
