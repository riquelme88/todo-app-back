import express, { urlencoded } from 'express'
import { router } from './routers/router'
import cors from 'cors'
import path from 'path'

const server = express()

server.use(express.json())
server.use(urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, '../public')))
server.use(cors())
server.use(cors({ exposedHeaders: 'Authorization' }))

const port = process.env.PORT || 4000

server.use('/', router)

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})