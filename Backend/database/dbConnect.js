import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'
dotenv.config()


export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database".bgGreen.bold);
    
}