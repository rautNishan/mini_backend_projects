export interface IGetKeyData {
  module: string;
  identifier: string | number;
}

export interface ISetKeyOptions {
  expirationSeconds?: number;
}
