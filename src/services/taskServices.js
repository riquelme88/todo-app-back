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
exports.getCategoryServices = exports.deleteTaskServiceCompleted = exports.deleteTaskService = exports.toogleTaskService = exports.updateTaskService = exports.findTaskByNameService = exports.addTaskService = exports.findTasksService = void 0;
const task_1 = require("../model/task");
const user_1 = require("../model/user");
const findTasksService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, task_1.findTasks)(id);
    if (!tasks) {
        throw new Error('not found task');
    }
    return tasks;
});
exports.findTasksService = findTasksService;
const addTaskService = (data, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('User not existing');
    }
    const task = yield (0, task_1.newTask)({
        category: data.category,
        task: data.task,
        user: { connect: { email } }
    });
    if (!task) {
        throw new Error('Task not created');
    }
    return task;
});
exports.addTaskService = addTaskService;
const findTaskByNameService = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('User not existing');
    }
    const task = (0, task_1.findTaskByName)(name, user.id);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
});
exports.findTaskByNameService = findTaskByNameService;
const updateTaskService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield (0, task_1.updateTaskModel)(id, {
        category: data.category,
        task: data.task
    });
    if (!updatedTask) {
        throw new Error('task not updated');
    }
    return updatedTask;
});
exports.updateTaskService = updateTaskService;
const toogleTaskService = (id, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const toogle = yield (0, task_1.toogleTask)(id, completed);
    if (!toogle) {
        throw new Error('Not possible toogle');
    }
    return toogle;
});
exports.toogleTaskService = toogleTaskService;
const deleteTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTask = yield (0, task_1.removeTask)(id);
    if (!deletedTask) {
        throw new Error('Not possible delete task');
    }
    return deletedTask;
});
exports.deleteTaskService = deleteTaskService;
const deleteTaskServiceCompleted = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByEmail)(email);
    const tasks = yield (0, task_1.removeTaskCompleted)(user === null || user === void 0 ? void 0 : user.id);
    if (!tasks) {
        throw new Error('Not found task completed');
    }
    return tasks;
});
exports.deleteTaskServiceCompleted = deleteTaskServiceCompleted;
const getCategoryServices = (category, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryService = yield (0, task_1.findByCategory)(category, userId);
    if (!categoryService) {
        throw new Error('Not found category');
    }
    return categoryService;
});
exports.getCategoryServices = getCategoryServices;
