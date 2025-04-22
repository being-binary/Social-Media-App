import express from 'express'
import PostController from '../controllers/postcontroller.js'
import checkToken from '../middleware/checkToken.js'
const router = express.Router()


router.post('/createpost', checkToken, PostController.createPost)

router.get('/getallpost', PostController.getAllPosts)

router.put('/updatepost/:pid', checkToken, PostController.updatePostById)

router.delete('/delete/:pid', checkToken, PostController.postDeleteById)

router.put('/like/:pid', checkToken, PostController.postLikes)

router.put('/comment/:pid', checkToken, PostController.postComment)

router.get('/getalluserpost',checkToken, PostController.getAllUserPost)

export default router