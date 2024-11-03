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
exports.findByCategory = exports.removeTaskCompleted = exports.removeTask = exports.toogleTask = exports.updateTaskModel = exports.findTasks = exports.findTaskByName = exports.newTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const newTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tasks.create({ data });
});
exports.newTask = newTask;
const findTaskByName = (name, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tasks.findFirst({
        where: {
            task: {
                equals: name,
                mode: 'insensitive'
            },
            userId
        }
    });
});
exports.findTaskByName = findTaskByName;
const findTasks = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tasks.findMany({ where: { userId: user } });
});
exports.findTasks = findTasks;
const updateTaskModel = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tasks.update({ where: { id }, data });
});
exports.updateTaskModel = updateTaskModel;
const toogleTask = (id, completed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tasks.update({ where: { id }, data: { completed } });
});
exports.toogleTask = toogleTask;
const removeTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tasks.delete({ where: { id } });
});
exports.removeTask = removeTask;
const removeTaskCompleted = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tasks.deleteMany({ where: { completed: true, userId } });
});
exports.removeTaskCompleted = removeTaskCompleted;
const findByCategory = (category, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tasks.findMany({
        where: {
            category: {
                equals: category,
                mode: 'insensitive'
            },
            userId
        }
    });
});
exports.findByCategory = findByCategory;
