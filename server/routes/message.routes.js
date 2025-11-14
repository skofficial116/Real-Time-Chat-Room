import express from 'express'
import { getRoomMessages, sendMessage } from '../controllers/messageController.js'

const router= express.Router()


router.post("/send", sendMessage)
router.get("/getMessages/:id", getRoomMessages)

export default router