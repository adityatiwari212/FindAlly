import mongoose from 'mongoose'
const {Collection}=mongoose

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
    }
})


export const UserModel=mongoose.model('MyAlly',UserSchema) 
console.log(UserModel.collection.name);