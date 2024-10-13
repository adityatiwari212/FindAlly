import { Server } from "socket.io"
import dotenv from 'dotenv'
import { MessageModel } from "./models/messageModel.js"
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
        console.log(message);
        
        const senderSocketId = userMap.get(message.sender)
        const receiverSocketId = userMap.get(message.receiver)
        
        const createdMessage = await MessageModel.create(message)

        console.log("New message created : ",createdMessage);
        
        const  messageData = await MessageModel.findById(createdMessage._id)
            .populate("sender","username email url")
            .populate("receiver","username email url")
        
        console.log("emitting message...");        

        if(receiverSocketId) io.to(receiverSocketId).emit("receiveMessage",messageData)
        if(senderSocketId) io.to(senderSocketId).emit("receiveMessage",messageData)
    }

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
