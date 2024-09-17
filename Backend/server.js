import express from 'express'
const app=express();
import cors from 'cors'
import dotenv from 'dotenv'
import 'colors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import { connectDB } from './database/dbConnect.js';
import fileUpload from 'express-fileupload';

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:5173',
    methods:["PUT","GET","POST","PATCH","DELETE"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT}`.bgBlue.bold);   
    connectDB()
})