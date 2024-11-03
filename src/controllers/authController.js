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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const authSchema_1 = require("../validation/authSchema");
const authServices_1 = require("../services/authServices");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const safeData = authSchema_1.addUserSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    try {
        const addUser = yield (0, authServices_1.registerUserService)({
            email: (_a = safeData.data) === null || _a === void 0 ? void 0 : _a.email,
            name: (_b = safeData.data) === null || _b === void 0 ? void 0 : _b.name,
            password: (_c = safeData.data) === null || _c === void 0 ? void 0 : _c.password
        });
        res.status(201).json({ addUser });
    }
    catch (error) {
        console.log(error);
        if (error)
            res.status(400).json({ error: 'Email existente' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const safeData = authSchema_1.loginUserSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    try {
        const user = yield (0, authServices_1.loginUserService)({
            email: (_a = safeData.data) === null || _a === void 0 ? void 0 : _a.email,
            password: (_b = safeData.data) === null || _b === void 0 ? void 0 : _b.password
        });
        return res.status(200).json({ user: user.name, token: user.token });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Usuario/senha incorreta' });
    }
});
exports.loginUser = loginUser;
