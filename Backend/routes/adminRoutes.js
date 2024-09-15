import express from 'express'
import { getAllUsers,deleteAllUsers } from '../controllers/adminController.js'
const router=express.Router()

router.route('/').get(getAllUsers).delete(deleteAllUsers)

export default router
