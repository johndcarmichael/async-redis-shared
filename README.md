# async-redis-shared

A package that wraps redis-async, it adds a shared redis connection to global.ASYNC_REDIS_SHARED, when i have time i will write a singleton class unless i find another 1 that already does this.

Call once as early as possible in your app and await the promise response... then just import it

## import the connector and connect
```
import connect from 'async-redis-shared/connect'
// Initialize Redis connection
connect(config.redis).catch((e) => {
  console.error('Error connecting to redis: ', e);
});
```

## use elsewhere in your app
```
import client from 'async-redis-shared'
await client.set('key:unittest', String(now));
const fetchedVal = await client.get('key:unittest');
```
