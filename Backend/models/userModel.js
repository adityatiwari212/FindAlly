import mongoose from 'mongoose'

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    url:String,
    requests:{
        default:0,
        type:Number
    },
    friends:{
        type:Number,
        default:0
    }
})


export const UserModel=mongoose.model('users',UserSchema) 
