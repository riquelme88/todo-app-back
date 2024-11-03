"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    task: zod_1.z.string({ message: 'Mande o nome da task' }).min(2, { message: 'A task tem que conter no minimo duas letras' }),
    completed: zod_1.z.boolean().optional(),
    category: zod_1.z.string({ message: 'Mande a categoria da task' }).optional()
});
exports.updateTaskSchema = zod_1.z.object({
    task: zod_1.z.string().min(2, { message: "A task deve conter no minimo 2 caracteres" }).optional(),
    category: zod_1.z.string().min(2, { message: 'A categoria deve conter no minimo 2 caracteres' }).optional(),
});
exports.nameTaskSchema = zod_1.z.object({
    name: zod_1.z.string({ message: "Mande o nome" }).min(2, { message: "A task deve conter no minimo 2 caracteres" })
});
