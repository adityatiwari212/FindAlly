import express from 'express'
import { createUser,loginUser,getOneUser,updateProfile } from '../controllers/userController.js'
import { getAllUsers } from '../controllers/adminController.js'
const router=express.Router()
import fileUpload from 'express-fileupload'
import { createChatController, loadChatsController, loadMessagesController } from '../controllers/chatControllers.js'

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getOneUser).put(fileUpload({
    useTempFiles: true,
    tempFileDir: 'C:/Windows/Temp'
}),updateProfile)
router.route('/').get(getAllUsers)
//chats
router.route('/chats').post(createChatController)
router.route('/chats/:id').get(loadChatsController)
//messages
router.route('/messages/:id').get(loadMessagesController)
export default router