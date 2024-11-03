"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authController = __importStar(require("../controllers/authController"));
const tasksController = __importStar(require("../controllers/tasksController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.json({ hello: 'hello' });
});
exports.router.post('/register', authController.registerUser);
exports.router.post('/login', authController.loginUser);
exports.router.post('/task', authMiddleware_1.middleware, tasksController.addTask);
exports.router.get('/tasks', authMiddleware_1.middleware, tasksController.getTasks);
exports.router.patch('/tasks/:name', authMiddleware_1.middleware, tasksController.updateTask);
exports.router.patch('/task', authMiddleware_1.middleware, tasksController.toogleCompleted);
exports.router.delete('/task', authMiddleware_1.middleware, tasksController.deleteTask);
exports.router.delete('/tasks', authMiddleware_1.middleware, tasksController.deleteTasks);
