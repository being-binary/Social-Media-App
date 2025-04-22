import express from 'express'
import cors from 'cors'
import dbconn from './config/Database/maindb.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import fileRoutes from './routes/fileUploadRoutes.js'
import actionRouter from './routes/actionRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import http from 'http'
import SocketManager from './socketio.js'

dbconn()
const port = 8082
const app = express()
const server = http.createServer(app)
const scoketManager = new SocketManager(server)

scoketManager.initSocketEvents()

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    res.status(200).json({msg:'server running successfully', success:true})
})

app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/fileUpload', fileRoutes)
app.use('/action',actionRouter)
app.use('/message',messageRouter)

server.listen(port, async () => {
    console.log(`server running at http://localhost:${port}`)
})