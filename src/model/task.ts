import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const newTask = async (data: Prisma.TasksCreateInput) => {
    return await prisma.tasks.create({ data })
}

export const findTaskByName = async (name: string, userId: string) => {
    return await prisma.tasks.findFirst({
        where: {
            task: {
                equals: name,
                mode: 'insensitive'
            },
            userId
        }
    })
}

export const findTasks = async (user: string) => {
    return await prisma.tasks.findMany({ where: { userId: user } })
}

export const updateTaskModel = async (id: string, data: Prisma.TasksUpdateInput) => {
    return await prisma.tasks.update({ where: { id }, data })
}

export const toogleTask = async (id: string, completed: boolean) => {
    return await prisma.tasks.update({ where: { id }, data: { completed } })
}

export const removeTask = async (id: string) => {
    return prisma.tasks.delete({ where: { id } })
}

export const removeTaskCompleted = async (userId: string) => {
    return prisma.tasks.deleteMany({ where: { completed: true, userId } })
}

export const findByCategory = async (category: string, userId: string) => {
    return prisma.tasks.findMany({
        where: {
            category: {
                equals: category,
                mode: 'insensitive'
            },
            userId
        }
    })
}
