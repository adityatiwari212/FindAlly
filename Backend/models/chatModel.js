import mongoose from 'mongoose'

const ChatSchema = mongoose.Schema({
    chatType:{
        type:String,
        enum:["personal","group"],
        required:true
    },
    name:{
        type:String,
        default:null
    },
    users:{
        type:[mongoose.Types.ObjectId],
        ref:'users',
        required:true
    }
})

export const ChatModel=mongoose.model('chats',ChatSchema)