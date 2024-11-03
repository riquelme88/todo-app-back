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
exports.loginUserService = exports.registerUserService = void 0;
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByEmail)(data.email);
    if (user) {
        throw new Error('User existing');
    }
    const passwordHash = yield bcrypt_1.default.hash(data.password, 10);
    const token = (0, authMiddleware_1.payload)(data.email);
    const addUser = yield (0, user_1.newUser)({
        name: data.name,
        email: data.email,
        password: passwordHash,
        token
    });
    return addUser;
});
exports.registerUserService = registerUserService;
const loginUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByEmail)(data.email);
    if (!user) {
        throw new Error('User not Exiting');
    }
    const password = yield bcrypt_1.default.compare(data.password, user.password);
    if (!password) {
        throw new Error('Password is incorrect');
    }
    return user;
});
exports.loginUserService = loginUserService;
