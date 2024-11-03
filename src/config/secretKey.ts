export const secretKey: string = process.env.SECRETKEY as string

if (!secretKey) {
    throw new Error('Not existing Secret Key')
}