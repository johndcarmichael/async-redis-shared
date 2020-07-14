import asyncRedis from 'async-redis'
import { ClientOpts, Commands, RedisClient } from 'redis'

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

export default (clientOpts?: ClientOpts): Promise<Promisified> => {
  return new Promise(((resolve, reject) => {
    if (!global.ASYNC_REDIS_SHARED) {
      global.ASYNC_REDIS_SHARED = asyncRedis.createClient(clientOpts || {})
      const connectionError = (err: any) => {
        console.log('Redis Error ' + err)
        reject(err)
      }
      global.ASYNC_REDIS_SHARED.getJson = async (key: string): Promise<any> => {
        try {
          return JSON.parse(String(await global.ASYNC_REDIS_SHARED.get(key)))
        } catch (e) {
          return null
        }
      }

      global.ASYNC_REDIS_SHARED.setJson = async (key: string, objectToStore: any): Promise<void> => {
        await global.ASYNC_REDIS_SHARED.set(key, JSON.stringify(objectToStore))
      }
      global.ASYNC_REDIS_SHARED.on('error', connectionError)
      global.ASYNC_REDIS_SHARED.on('ready', () => {
        global.ASYNC_REDIS_SHARED.removeListener('error', connectionError)
        global.ASYNC_REDIS_SHARED.on('error', (err: any) => {
          console.log('Redis Error ' + err)
        })
        console.log('Redis Connection Ready.')
        resolve(global.ASYNC_REDIS_SHARED as Promisified)
      })
    } else {
      resolve(global.ASYNC_REDIS_SHARED as Promisified)
    }
  }))
};
