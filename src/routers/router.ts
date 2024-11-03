import { RequestHandler, Router } from "express";
import * as authController from '../controllers/authController'
import * as tasksController from '../controllers/tasksController'
import { middleware } from "../middleware/authMiddleware";

export const router = Router()

router.get('/', (req, res) => {
    res.json({ hello: 'hello' })
})

router.post('/register', authController.registerUser as RequestHandler)
router.post('/login', authController.loginUser as RequestHandler)

router.post('/task', middleware as RequestHandler, tasksController.addTask as RequestHandler)
router.get('/tasks', middleware as RequestHandler, tasksController.getTasks as RequestHandler)
router.patch('/tasks/:name', middleware as RequestHandler, tasksController.updateTask as RequestHandler)
router.patch('/task', middleware as RequestHandler, tasksController.toogleCompleted as RequestHandler)
router.delete('/task', middleware as RequestHandler, tasksController.deleteTask as RequestHandler)
router.delete('/tasks', middleware as RequestHandler, tasksController.deleteTasks)






