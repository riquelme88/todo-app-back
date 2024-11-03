import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { findUserByToken } from '../model/user'
import { ExtendedRequest } from '../types/extendedRequest'
import { secretKey } from '../config/secretKey'

export const payload = (email: string) => {
    return jwt.sign(email, secretKey)
}

export const middleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization']

    if (!header) return res.status(401).json({ error: 'Mande um header' })

    const token = header?.split(' ')[1]

    const verify = jwt.verify(token as string, secretKey,
        async (error, decoded: any) => {
            if (error) return res.json({ error: 'Token inválido' })

            const user = await findUserByToken(token as string)
            if (!user) return res.status(401).json({ error: 'Acesso negado' })

            req.userEmail = user.email as string
            next()
        }
    )
}