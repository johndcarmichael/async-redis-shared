"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const async_redis_1 = tslib_1.__importDefault(require("async-redis"));
exports.default = (clientOpts) => {
    return new Promise(((resolve, reject) => {
        if (!global.ASYNC_REDIS_SHARED) {
            global.ASYNC_REDIS_SHARED = async_redis_1.default.createClient(clientOpts || {});
            const connectionError = (err) => {
                console.log('Redis Error ' + err);
                reject(err);
            };
            global.ASYNC_REDIS_SHARED.getJson = async (key) => {
                return JSON.parse(String(await global.ASYNC_REDIS_SHARED.get(key)));
            };
            global.ASYNC_REDIS_SHARED.setJson = async (key, objectToStore) => {
                await global.ASYNC_REDIS_SHARED.set(key, JSON.stringify(objectToStore));
            };
            global.ASYNC_REDIS_SHARED.on('error', connectionError);
            global.ASYNC_REDIS_SHARED.on('ready', () => {
                global.ASYNC_REDIS_SHARED.removeListener('error', connectionError);
                global.ASYNC_REDIS_SHARED.on('error', (err) => {
                    console.log('Redis Error ' + err);
                });
                console.log('Redis Connection Ready.');
                resolve(global.ASYNC_REDIS_SHARED);
            });
        }
        else {
            resolve(global.ASYNC_REDIS_SHARED);
        }
    }));
};
