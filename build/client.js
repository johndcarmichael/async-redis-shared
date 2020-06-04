"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    if (!global.ASYNC_REDIS_SHARED) {
        throw new Error('No connection to redis yet');
    }
    return global.ASYNC_REDIS_SHARED;
})();
