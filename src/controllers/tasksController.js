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
exports.deleteTasks = exports.deleteTask = exports.toogleCompleted = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const user_1 = require("../model/user");
const taskSchema_1 = require("../validation/taskSchema");
const taskServices_1 = require("../services/taskServices");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.userEmail;
    try {
        const user = yield (0, user_1.findUserByEmail)(userEmail);
        const tasks = yield (0, taskServices_1.findTasksService)(user === null || user === void 0 ? void 0 : user.id);
        res.json({ tasks });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Nenhuma task encontrada' });
    }
});
exports.getTasks = getTasks;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const safeData = taskSchema_1.createTaskSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(401).json({ error: safeData.error.flatten().fieldErrors });
    const user = yield (0, user_1.findUserByEmail)(req.userEmail);
    try {
        const task = yield (0, taskServices_1.addTaskService)({
            category: safeData.data.category,
            task: safeData.data.task,
            id: user === null || user === void 0 ? void 0 : user.id
        }, user === null || user === void 0 ? void 0 : user.email);
        res.status(201).json({ task });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Task não criada' });
    }
});
exports.addTask = addTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const safeDataName = taskSchema_1.nameTaskSchema.safeParse(req.params);
    if (!safeDataName.success)
        return res.status(401).json({ error: safeDataName.error.flatten().fieldErrors });
    const safeData = taskSchema_1.updateTaskSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(401).json({ error: safeData.error.flatten().fieldErrors });
    const user = yield (0, user_1.findUserByEmail)(req.userEmail);
    if (!user)
        return res.status(400).json({ error: 'Ocorreu algum error!' });
    try {
        const task = yield (0, taskServices_1.findTaskByNameService)(safeDataName.data.name, req.userEmail);
        const updateTask = yield (0, taskServices_1.updateTaskService)(task === null || task === void 0 ? void 0 : task.id, {
            category: safeData.data.category,
            task: safeData.data.task
        });
        res.status(202).json({ updateTask });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Task não encontrada!' });
    }
});
exports.updateTask = updateTask;
const toogleCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const safeData = taskSchema_1.nameTaskSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(401).json({ error: safeData.error.flatten().fieldErrors });
    try {
        const task = yield (0, taskServices_1.findTaskByNameService)(safeData.data.name, req.userEmail);
        if ((task === null || task === void 0 ? void 0 : task.completed) == true) {
            const updatedTask = yield (0, taskServices_1.toogleTaskService)(task.id, false);
            return res.status(202).json({ updatedTask });
        }
        else {
            const updatedTask = yield (0, taskServices_1.toogleTaskService)(task === null || task === void 0 ? void 0 : task.id, true);
            return res.status(202).json({ updatedTask });
        }
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Ocorreu algum error' });
    }
});
exports.toogleCompleted = toogleCompleted;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const safeData = taskSchema_1.nameTaskSchema.safeParse(req.body);
    if (!safeData.success)
        return res.status(401).json({ error: safeData.error.flatten().fieldErrors });
    try {
        const task = yield (0, taskServices_1.findTaskByNameService)((_a = safeData.data) === null || _a === void 0 ? void 0 : _a.name, req.userEmail);
        const taskDeleted = yield (0, taskServices_1.deleteTaskService)(task === null || task === void 0 ? void 0 : task.id);
        res.status(204).json({ msg: 'Task deletada' });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Ocorreu algum error' });
    }
});
exports.deleteTask = deleteTask;
const deleteTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, taskServices_1.deleteTaskServiceCompleted)(req.userEmail);
        res.json({ tasks });
    }
    catch (error) {
        if (error)
            res.status(400).json({ error: 'Ocorreu algum error' });
    }
});
exports.deleteTasks = deleteTasks;
