export const secretKey: string = process.env.SECRET_KEY as string

if (!secretKey) {
    throw new Error('Not existing Secret Key')
}