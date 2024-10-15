import { Server } from "socket.io"
import dotenv from 'dotenv'
import { MessageModel } from "./models/messageModel.js"
import { sendFileController } from "./controllers/chatControllers.js"
dotenv.config()

export const setupSocket=(server)=>{
    const io=new Server(server,{
        cors:{
            origin:process.env.FRONTEND_URL,
            methods:["GET","POST"],
            credentials:true,
        }
    })
    const userMap = new Map()

    const disconnect=(socket)=>{
        console.log("Client disconnected : ",socket.id);
        for(const[userid,socketid] of userMap){
            if(socketid === socket.id){
                userMap.delete(userid)
                break
            }
        }
    }

    const sendMessage= async (message)=>{
        console.log("message : "+message);
        let createdMessage

        if(message.fileUrl){
            const senderSocketId = userMap.get(message.sender._id)
            const receiverSocketId=userMap.get(message.receiver._id)
            console.log("emitting file from"+senderSocketId+"to "+receiverSocketId);        
            if(receiverSocketId) io.to(receiverSocketId).emit("receiveMessage",message)
            if(senderSocketId) io.to(senderSocketId).emit("receiveMessage",message)
        }

        else{
            const newMessage = await MessageModel.create(message)
            console.log("New message created : ",newMessage);
            createdMessage = await MessageModel.findById(newMessage._id)
                .populate("sender","username email url")
                .populate("receiver","username email url")
        
        const senderSocketId = userMap.get(message.sender)
        const receiverSocketId=userMap.get(message.receiver)
        console.log("emitting message...");        
        if(receiverSocketId) io.to(receiverSocketId).emit("receiveMessage",createdMessage)
        if(senderSocketId) io.to(senderSocketId).emit("receiveMessage",createdMessage)
    }}

    io.on("connection",(socket)=>{    
        const userid=socket.handshake.query.userid
        if(userid){
            userMap.set(userid,socket.id)
            console.log(`User connected ${userid} with socket : ${socket.id}`);        
        }
        else{
            console.log("User id not provided");        
        }

        socket.on("disconnect",()=>disconnect(socket))

        //socket funcs
        socket.on("sendMessage",sendMessage)

    })
}
