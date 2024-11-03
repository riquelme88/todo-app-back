import { Request, RequestHandler, Response } from "express";
import { addUserSchema, loginUserSchema } from "../validation/authSchema";
import { loginUserService, registerUserService } from "../services/authServices";

export const registerUser = async (req: Request, res: Response) => {
    const safeData = addUserSchema.safeParse(req.body)
    if (!safeData.success) return res.status(400).json({ error: safeData.error.flatten().fieldErrors })

    try {
        const addUser = await registerUserService({
            email: safeData.data?.email,
            name: safeData.data?.name,
            password: safeData.data?.password
        })

        res.status(201).json({ addUser })
    } catch (error) {
        console.log(error)
        if (error) res.status(400).json({ error: 'Email existente' })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const safeData = loginUserSchema.safeParse(req.body)
    if (!safeData.success) return res.status(400).json({ error: safeData.error.flatten().fieldErrors })

    try {
        const user = await loginUserService({
            email: safeData.data?.email,
            password: safeData.data?.password
        })
        return res.status(200).json({ user: user.name, token: user.token })
    } catch (error) {
        if (error) res.status(400).json({ error: 'Usuario/senha incorreta' })
    }
}