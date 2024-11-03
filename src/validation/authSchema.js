"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.addUserSchema = void 0;
const zod_1 = require("zod");
exports.addUserSchema = zod_1.z.object({
    name: zod_1.z.string({ message: "Nome é obrigatorio" }).min(2, 'Nome com no minimo 2 caracteres'),
    email: zod_1.z.string({ message: "Mande um e-mail" }).email({ message: 'Email inválido' }),
    password: zod_1.z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: 'A senha deve conter no minimo uma letra maiuscula um numero e um simbolo' }).min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
    token: zod_1.z.string().optional()
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Mande um email" }).email({ message: "Mande um email válido" }),
    password: zod_1.z.string({ message: 'Mande uma senha' }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: 'A senha deve conter no minimo uma letra maiuscula um numero e um simbolo' }).min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
});
