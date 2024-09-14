import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType, SetOptions } from 'redis';
import { REDIS_TOKEN } from '../constants/redis.constant';
import { IGetKeyData, ISetKeyOptions } from '../interfaces/redis.interface';

@Injectable()
export class RedisKeyValueService {
  constructor(@Inject(REDIS_TOKEN) private readonly _redis: RedisClientType) {}

  /**
   * function to get key from module, feature and identifier
   * example: key = `user:passwordAttempt:1234`
   * @param data
   * @returns {string}
   */
  generateKey(data: IGetKeyData): string {
    return `${data.module ?? ''}:${data.feature ?? ''}:${
      data.identifier ?? ''
    }`;
  }

  /**
   * @async
   * function to set the key value pair in redis
   * @param key {string}
   * @param value {number?} - default 1
   * @param options {any} - extra options
   */
  async set(
    key: string,
    value: number | string,
    options?: ISetKeyOptions,
  ): Promise<void> {
    const opt: SetOptions = {};
    if (options?.expirationSeconds) {
      opt.EX = options.expirationSeconds;
    }
    await this._redis.set(key, value, opt);
  }

  /**
   * @async
   * function to get the value of key in redis
   * @param key {string}
   * @returns {Promise<string|null>}
   */
  async get(key: string): Promise<string | null> {
    const data: string | null = await this._redis.get(key);
    return data;
  }

  /**
   * @async
   * function to increment the count of key which stores number
   * @param key {string}
   * @param by {number?} - count by which the number should be incremented, default is 1.
   * @returns {Promise<number>}
   */
  async increment(key: string, by: number = 1): Promise<number> {
    return await this._redis.incrBy(key, by);
  }

  /**
   * @async
   * function to decrement the count of key which stores number
   * @param key {string}
   * @param by {number?} - count by which the number should be decremented, default is 1.
   * @returns {Promise<number>}
   */
  async decrement(key: string, by: number = 1): Promise<number> {
    return await this._redis.decrBy(key, by);
  }

  /**
   * @async
   * function to check if key exists
   * @param key {string}
   * @returns {Promise<boolean>}
   */
  async keyExists(key: string): Promise<boolean> {
    return !!(await this._redis.get(key));
  }

  /**
   * @async
   * function to remove key
   * @param key {string}
   * @returns {Promise<boolean>}
   */
  async removeKey(key: string): Promise<boolean> {
    return !!(await this._redis.del(key));
  }

  async removeRequestData(data: IGetKeyData) {
    const key = this.generateKey(data);
    const check = this.keyExists(key);
    if (check) {
      this.removeKey(key);
    }
  }

  /**
   * Asynchronously iterates over keys matching a specific pattern.
   * @param pattern {string} The pattern to match keys against.
   * @returns {Promise<string[]>} An array of keys matching the pattern.
   */
  async scan(pattern: string): Promise<string[]> {
    let cursor = 0;
    const keys: string[] = [];

    do {
      const reply = await this._redis.scan(cursor, {
        MATCH: pattern + '*',
        COUNT: 1000,
      });

      // Update the cursor for the next iteration
      cursor = reply.cursor;

      // Collect keys from this iteration
      keys.push(...reply.keys);
    } while (cursor !== 0); // Continue until the full database scan is complete

    return keys;
  }
}
