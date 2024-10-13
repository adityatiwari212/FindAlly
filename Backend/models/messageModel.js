import mongoose from 'mongoose'

const MessageSchema= mongoose.Schema({
    chat:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    sender:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'users'
    },
    messageType:{
        type:String,
        enum:["text","file"],
        required:true,
    },
    data:{
        type:String,
        required: function(){
            return this.messageType=='text'
        }
    },
    fileUrl:{
        type:String,
        required: function(){
            return this.messageType=="file"
        }
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

export const MessageModel = mongoose.model("Messages",MessageSchema)