import { findByCategory, findTaskByName, findTasks, newTask, removeTask, removeTaskCompleted, toogleTask, updateTaskModel } from "../model/task"
import { findUserByEmail } from "../model/user"

export const findTasksService = async (id: string) => {
    const tasks = await findTasks(id)

    if (!tasks) {
        throw new Error('not found task')
    }

    return tasks
}

export const addTaskService = async (data: TaskType, email: string) => {
    const user = await findUserByEmail(email)
    if (!user) {
        throw new Error('User not existing')
    }
    const task = await newTask({
        category: data.category as string,
        task: data.task as string,
        user: { connect: { email } }
    })

    if (!task) {
        throw new Error('Task not created')
    }

    return task
}

export const findTaskByNameService = async (name: string, email: string) => {
    const user = await findUserByEmail(email)
    if (!user) {
        throw new Error('User not existing')
    }

    const task = findTaskByName(name, user.id)

    if (!task) {
        throw new Error('Task not found')
    }

    return task
}

export const updateTaskService = async (id: string, data: TaskType) => {
    const updatedTask = await updateTaskModel(id, {
        category: data.category,
        task: data.task
    })

    if (!updatedTask) {
        throw new Error('task not updated')
    }

    return updatedTask
}

export const toogleTaskService = async (id: string, completed: boolean) => {
    const toogle = await toogleTask(id, completed)

    if (!toogle) {
        throw new Error('Not possible toogle')
    }

    return toogle
}

export const deleteTaskService = async (id: string) => {
    const deletedTask = await removeTask(id)

    if (!deletedTask) {
        throw new Error('Not possible delete task')
    }

    return deletedTask
}

export const deleteTaskServiceCompleted = async (email: string) => {
    const user = await findUserByEmail(email)

    const tasks = await removeTaskCompleted(user?.id as string)

    if (!tasks) {
        throw new Error('Not found task completed')
    }

    return tasks
}

export const getCategoryServices = async (category: string, userId: string) => {
    const categoryService = await findByCategory(category, userId)

    if (!categoryService) {
        throw new Error('Not found category')
    }

    return categoryService
}
