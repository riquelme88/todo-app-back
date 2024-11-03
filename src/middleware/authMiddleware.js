"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.payload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const secretKey_1 = require("../config/secretKey");
const payload = (email) => {
    return jsonwebtoken_1.default.sign(email, secretKey_1.secretKey);
};
exports.payload = payload;
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers['authorization'];
    if (!header)
        return res.status(401).json({ error: 'Mande um header' });
    const token = header === null || header === void 0 ? void 0 : header.split(' ')[1];
    const verify = jsonwebtoken_1.default.verify(token, secretKey_1.secretKey, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return res.json({ error: 'Token inválido' });
        const user = yield (0, user_1.findUserByToken)(token);
        if (!user)
            return res.status(401).json({ error: 'Acesso negado' });
        req.userEmail = user.email;
        next();
    }));
});
exports.middleware = middleware;
