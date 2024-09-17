import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'
dotenv.config()
import { UserModel } from '../models/userModel.js'


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "users"
    }).then(() => {
        console.log(`Connected to database`.bgGreen.white);
    }).catch(error => {
        console.log(`Could not connect to database: ${error}`.bgRed.white);
    })
};