"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    category: zod_1.z.string({ message: 'Mande a categoria' }).min(2, { message: 'Categoria deve conter no minimo 2 caracteres' })
});
