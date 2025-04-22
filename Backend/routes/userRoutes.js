import express, { Router } from 'express'
import checkToken from '../middleware/checkToken.js'
import { deleteUser, followAndFollowing, forgetpassword, forgetpasswordPage, getdetails, loginUser, registerUser, setNewPassword, updateUser } from '../controllers/usercontroller.js'
import { body } from 'express-validator'
const router = express.Router()


router.post('/signup',[
        body('email').isEmail().withMessage('please enter a valid email'),
        body('password').isLength({min:6}).isAlphanumeric().withMessage('password must be atleast 6 character long'),
        body('firstName').isLength({min:3}).withMessage('first name should be atleast 3 character long'),
        body('lastName').isLength({min:3}).withMessage('first name should be atleast 3 character long'),
    ],registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character long'),  
], loginUser
)

router.put('/update', checkToken, updateUser)
router.delete('/delete', checkToken, deleteUser)

router.post('/reset-password',[
    body('email').isEmail().withMessage('please enter a valid email'),
], forgetpassword)

router.get('/reset-password/:token', forgetpasswordPage)

router.post('/setnewpassword',setNewPassword)

router.get("/getdetails", checkToken, getdetails)

router.put('/followUnfollow', checkToken, followAndFollowing)


export default router