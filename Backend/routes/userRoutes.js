import express from 'express'
import { createUser,loginUser,getOneUser,updateProfile } from '../controllers/userController.js'
import { getAllUsers } from '../controllers/adminController.js'
const router=express.Router()
import fileUpload from 'express-fileupload'

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getOneUser).put(fileUpload({
    useTempFiles: true,
    tempFileDir: 'C:/Windows/Temp'
}),updateProfile)
router.route('/').get(getAllUsers)

export default router