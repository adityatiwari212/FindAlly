import express from 'express'
const app=express();
import cors from 'cors'
import dotenv from 'dotenv'
import 'colors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import projectRouter from './routes/projectRoutes.js';
import { connectDB } from './database/dbConnect.js';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import {createServer} from 'http'
import { setupSocket } from './socket.js';

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:5173',
    methods:["PUT","GET","POST","PATCH","DELETE"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/project' ,projectRouter);
//Socket
const server = createServer(app)
// const io=new Server(server,{
//     cors:{
//         origin:'http://localhost:5173',
//         methods:["PUT","GET","POST","PATCH","DELETE"],
//         credentials:true,
//     }
// })

//io middleware


// io.on("connection",(socket)=>{
//     socket.emit("welcome",`Welcome to the server ${socket.id}`)
//     socket.broadcast.emit("welcome",`${socket.id} joined the server`)
//     socket.on("disconnect",()=>()=>{
//         console.log(`${socket.id} disconnnected`);
//     })
//     socket.on("message",(data)=>{
//         console.log("Received on server :",data);
//         io.emit("message",`${data.user} : ${data.input}`)
//     })
//     socket.on("room-message",(data)=>{
//         console.log("Received on server :",data);
//         socket.to(data.room).emit("room-message",`${data.user} : ${data.input}`)
//         socket.emit("room-message",`${data.user} : ${data.input}`)
//     })
//     socket.on("join-room",(data)=>{
//         console.log(`${socket.id} joined ${data.roomName}`)
//         socket.join(data.roomName)
//     })
//     // socket.on("room-message",(data)=>{
//     //     socket.to(data.room)
//     // })
// })

setupSocket(server)

server.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server listening to port ${process.env.PORT}`.bgBlue.bold);   
})