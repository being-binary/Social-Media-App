import express from 'express'
import actionController from '../controllers/actionController.js'
import checkToken from '../middleware/checkToken.js'
const router = express.Router()

router.post('/getfriend/:fid',checkToken, actionController.findUserByIdWithDetailsAndPosts)
router.get('/finduser', checkToken, actionController.findUserByName)


export default router
