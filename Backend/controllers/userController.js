import { UserModel } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { uploadOnCloud } from "../utils/cloudinary.js";
import dotenv from 'dotenv'
dotenv.config() 

export const createUser=async (req,res)=>{
    try {
        const {name,username,email,password}=req.body
        if(!username || !password || !name || !email){
            return res.status(400).json({
                success:false,
                message:"Please enter all credentials"
            })
        }
        const existingMail=await UserModel.findOne({email:email})
        if(existingMail){
            return res.status(400).json({
                success:false,
                message:"Email already in use"
            })
        }
        const existingUsername=await UserModel.findOne({name:name})
        if(existingUsername){
            return res.status(400).json({
                success:false,
                message:"Username already in use"
            })
        }
        const hashedPass=await bcrypt.hash(password,10)
        const user=await UserModel.create({username,password:hashedPass,name,email})
        return res.status(201).json({
            success:true,
            messsage:"Sign Up Successful",
            user:user
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })    
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body

        const validUser=await UserModel.findOne({username:username})
        
        
        if(!validUser){
            return res.status(400).json({
                success:false,
                message:"Invalid username"
            })
        } 

        const valid=await bcrypt.compare(password,validUser.password)
        if(!valid){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }  

        const token=jwt.sign({id:validUser.id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(201).json({
            success:true,
            message:"Signed In Successfully",
            token:token,
            user:validUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getOneUser=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await UserModel.findById(id)
        res.status(201).json({
            success:true,
            message:"user found",
            user:user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const id=req.params.id
        const {name,email,username}=req.body
        if(!name || !email || !username)
            return res.status(401).json({
                success:false,
                message:"Please enter credentials"
            }) 
        let url="" 
        if(req.files){
            const {image}=req.files
            console.log(image);
            const types=['image/jpg','image/png','image/jpeg']            
            if(!types.includes(image.mimetype))
                return res.json({
                    success:false,
                    message:"Use only png, jpg or jpeg files"
                }) 
            url=await uploadOnCloud(image.tempFilePath)
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id,{name,email,username,url},{new:true})
            return res.status(201).json({
                success:true,
                message:"User updated successfully",
                user:updatedUser
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        }) 
    }
}