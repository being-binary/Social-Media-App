import express from 'express'
import checkToken from '../middleware/checkToken.js'
import messageController from '../controllers/messageController.js'
const router = express.Router()

router.post('/sendmessage/:fid',checkToken,messageController.SendMessage)
router.get('/getmessages/:fid',checkToken, messageController.GetMessages)
router.get('/getmessagebyuser/',checkToken,messageController.GetMessagesByUser)

export default router