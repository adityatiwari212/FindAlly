import { UserModel } from "../models/userModel.js";

export const getAllUsers=async(req,res)=>{
    try {
        const users= await UserModel.find({})
        res.status(201).json({
            success:true,
            users:users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

export const deleteAllUsers=async(req,res)=>{
    try {
        const users= await UserModel.deleteMany({},{new:true})
        res.status(201).json({
            success:true,
            users:users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}