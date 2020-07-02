"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    if (!global.ASYNC_REDIS_SHARED) {
        throw new Error('No connection to redis yet');
    }
    return global.ASYNC_REDIS_SHARED;
}
exports.default = default_1;
