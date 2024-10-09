import mongoose from 'mongoose'

const ChatSchema= mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    chats:{
        type:[String],
        required:true,
    },
    
})