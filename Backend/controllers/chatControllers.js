import {ChatModel} from '../models/chatModel.js'
import { MessageModel } from '../models/messageModel.js'
import { uploadOnCloud } from '../utils/cloudinary.js'

export const createChatController=async(req,res)=>{
    try {
        const {users}=req.body
        if(users.length<2) return res.status(401).json({
            success:false,
            message:"Select atleast one user"
        })
        const chat=await ChatModel.create(req.body)
        const populatedChat=await ChatModel.findById(chat._id).populate('users','username')
        res.status(200).json({
            success:true,
            message:"Chat created",
            populatedChat
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })   
    }
}

export const loadChatsController=async(req,res)=>{
    try {
        const userid=req.params.id
        const chats=await ChatModel.find({users:userid}).populate('users','username')
        res.status(200).json({
            success:true,
            message:"Chats loaded successfully",
            chats
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })            
    }
}

export const loadMessagesController=async(req,res)=>{
    try {
        const chat=req.params.id
        const messages=await MessageModel.find({chat:chat}).populate('sender','username')
        res.status(200).json({
            success:true,
            message:"Messages Loaded",
            messages
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })     
    }
}

export const sendFileController = async (req, res) => {
    try {
        const { sender, messageType, receiver, chat } = req.body;
        const { file } = req.files;
        const receiverId=receiver==="null"?null:receiver
        console.log(file);

        const url = await uploadOnCloud(file.tempFilePath);
        const messageData = {
            chat,
            sender,
            fileUrl: url,
            messageType
        };

        if (receiverId) {
            messageData.receiver = receiverId;
        }

        const message = await MessageModel.create(messageData);

        let populatedMessage = await MessageModel.findById(message._id)
            .populate("sender", "username email url");

        if (receiverId) {
            populatedMessage = await populatedMessage.populate("receiver", "username email url");
        }

        res.status(201).json({
            success: true,
            message: "File uploaded",
            populatedMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
