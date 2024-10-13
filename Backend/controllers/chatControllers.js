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

export const sendFileController=async(req,res)=>{
    try {
        const {sender,receiver}=req.body
        const {file}=req.files
        console.log(file);        
        const url=uploadOnCloud(file.tempFilePath)
        const message=await MessageModel.create({sender,receiver,fileUrl:url})
        const populatedMessage=await MessageModel.findbyId(message._id)
        .populate("sender","username email url")
        .populate("receiver","username email url")
        res.status(201).json({
            success:true,
            message:"File uploaded",
            populatedMessage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })  
    }
}