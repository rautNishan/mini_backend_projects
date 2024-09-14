export interface IGetKeyData {
  module: string;
  feature: string;
  identifier: string;
}

export interface ISetKeyOptions {
  expirationSeconds?: number;
}
