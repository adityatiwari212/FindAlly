import express from 'express'
const app=express();
import cors from 'cors'
import dotenv from 'dotenv'
import 'colors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import { connectDB } from './database/dbConnect.js';

dotenv.config()

app.use(cors({
    Origin:process.env.FRONTEND_URI,
    credentials:true,
    methods:["PUT","GET","POST","PATCH","DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT}`.bgBlue.bold);   
    connectDB()
})