import { Response } from "express"
import { findUserByEmail } from "../model/user"
import { ExtendedRequest } from "../types/extendedRequest"
import { createTaskSchema, nameTaskSchema, updateTaskSchema } from "../validation/taskSchema"
import { addTaskService, deleteTaskService, deleteTaskServiceCompleted, findTaskByNameService, findTasksService, toogleTaskService, updateTaskService } from "../services/taskServices"

export const getTasks = async (req: ExtendedRequest, res: Response) => {
    const userEmail = req.userEmail
    try {
        const user = await findUserByEmail(userEmail as string)
        const tasks = await findTasksService(user?.id as string)
        res.json({ tasks })
    } catch (error) {
        if (error) res.status(400).json({ error: 'Nenhuma task encontrada' })
    }
}

export const addTask = async (req: ExtendedRequest, res: Response) => {
    const safeData = createTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const user = await findUserByEmail(req.userEmail as string)

    try {
        const task = await addTaskService({
            category: safeData.data.category,
            task: safeData.data.task,
            id: user?.id
        }, user?.email as string)

        res.status(201).json({ task })
    } catch (error) {
        if (error) res.status(400).json({ error: 'Task não criada' })
    }

}

export const updateTask = async (req: ExtendedRequest, res: Response) => {
    const safeDataName = nameTaskSchema.safeParse(req.params)
    if (!safeDataName.success) return res.status(401).json({ error: safeDataName.error.flatten().fieldErrors })

    const safeData = updateTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const user = await findUserByEmail(req.userEmail as string)
    if (!user) return res.status(400).json({ error: 'Ocorreu algum error!' })

    try {
        const task = await findTaskByNameService(safeDataName.data.name as string, req.userEmail as string)
        const updateTask = await updateTaskService(task?.id as string, {
            category: safeData.data.category,
            task: safeData.data.task
        })
        res.status(202).json({ updateTask })
    } catch (error) {
        if (error) res.status(400).json({ error: 'Task não encontrada!' })
    }
}

export const toogleCompleted = async (req: ExtendedRequest, res: Response) => {
    const safeData = nameTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    try {
        const task = await findTaskByNameService(safeData.data.name as string, req.userEmail as string)
        if (task?.completed == true) {
            const updatedTask = await toogleTaskService(task.id as string, false)
            return res.status(202).json({ updatedTask })
        } else {
            const updatedTask = await toogleTaskService(task?.id as string, true)
            return res.status(202).json({ updatedTask })
        }
    } catch (error) {
        if (error) res.status(400).json({ error: 'Ocorreu algum error' })
    }

}

export const deleteTask = async (req: ExtendedRequest, res: Response) => {
    const safeData = nameTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    try {
        const task = await findTaskByNameService(safeData.data?.name as string, req.userEmail as string)
        const taskDeleted = await deleteTaskService(task?.id as string)
        res.status(204).json({ msg: 'Task deletada' })

    } catch (error) {
        if (error) res.status(400).json({ error: 'Ocorreu algum error' })
    }

}

export const deleteTasks = async (req: ExtendedRequest, res: Response) => {
    try {
        const tasks = await deleteTaskServiceCompleted(req.userEmail as string)
        res.json({ tasks })
    } catch (error) {
        if (error) res.status(400).json({ error: 'Ocorreu algum error' })
    }
}

