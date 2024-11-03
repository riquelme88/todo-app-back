import { payload } from "../middleware/authMiddleware"
import { findUserByEmail, newUser } from "../model/user"
import bcrypt from 'bcrypt'
import { UserType } from "../types/UserType"

export const registerUserService = async (data: UserType) => {
    const user = await findUserByEmail(data.email as string)

    if (user) {
        throw new Error('User existing')
    }

    const passwordHash = await bcrypt.hash(data.password as string, 10)
    const token = payload(data.email as string,)

    const addUser = await newUser({
        name: data.name as string,
        email: data.email as string,
        password: passwordHash,
        token
    })

    return addUser
}

export const loginUserService = async (data: UserType) => {
    const user = await findUserByEmail(data.email as string)

    if (!user) {
        throw new Error('User not Exiting')
    }

    const password = await bcrypt.compare(data.password as string, user.password)

    if (!password) {
        throw new Error('Password is incorrect')
    }

    return user
}