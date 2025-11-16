import express from 'express'
import { getRoomMessages, sendMessage } from '../controllers/messageController.js'
import { isLoggedIn } from '../middleware/auth.js'

const router= express.Router()


router.post("/sendMessage", isLoggedIn, sendMessage)
router.get("/getMessages/:id", getRoomMessages)

export default router