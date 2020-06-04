import { ClientOpts, Commands, RedisClient } from 'redis';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type Omitted = Omit<RedisClient, keyof Commands<boolean>>;
interface AsyncRedisShared {
    getJson(key: string): Promise<any>;
    setJson(key: string, objectToStore: any): Promise<void>;
}
interface Promisified<T = RedisClient> extends Omitted, AsyncRedisShared, Commands<Promise<boolean>> {
}
declare const _default: (clientOpts?: ClientOpts) => Promise<Promisified>;
export default _default;
