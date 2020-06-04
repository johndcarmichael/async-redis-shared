import { Commands, RedisClient } from 'redis';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Omitted = Omit<RedisClient, keyof Commands<boolean>>;

interface AsyncRedisShared {
  getJson (key: string): Promise<any>;

  setJson (key: string, objectToStore: any): Promise<void>;
}

interface Promisified<T = RedisClient>
  extends Omitted,
    AsyncRedisShared,
    Commands<Promise<boolean>> {}

export default ((): Promisified => {
  if (!global.ASYNC_REDIS_SHARED) {
    throw new Error('No connection to redis yet');
  }
  return global.ASYNC_REDIS_SHARED;
})();
