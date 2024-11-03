"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
exports.secretKey = process.env.SECRETKEY;
if (!exports.secretKey) {
    throw new Error('Not existing Secret Key');
}
