
import postCollection from '../model/postCollections.js';

class PostController {
    
    // Method to create a new post
    async createPost(req, res) {
        try {
            const { id, media } = req;
            const { title } = req.body;
            console.log('hello')
            if (!title) {
                res.status(400).json({ msg: "title data is required", success: false });
            }
            const pkg = {}
            pkg['title'] = title
            pkg['userId'] = id;
            if(media){
                pkg['media'] = media
            }
            
            console.log(pkg)
            
            await postCollection.create({ ...pkg })
                .then((post) => {
                    res.status(200).json({ msg: 'Post created successfully', success: true, post });
                })
                .catch((err) => {
                    res.status(400).json({ msg: 'Post creation unsuccessful', success: false, err: err.message });
                });

        } catch (err) {
            res.status(500).json({ msg: `${err.message}`, success: false });
        }
    }

    // Method to fetch all posts
    async getAllPosts(req, res) {
        try {
            const posts = await postCollection.find().sort({createdAt:-1}).populate({ path: 'userId', select: '-password' }).populate({path: 'comments', populate:{path:'user', select:'-password'}});
            if (posts) {
                res.status(200).json({ msg: 'Fetching posts successful', success: true, posts });
            } else {
                res.status(404).json({ msg: 'No posts found', success: false });
            }
        } catch (err) {
            res.status(500).json({ msg: `${err.message}`, success: false });
        }
    }

    // Method to update a post by ID
    async updatePostById(req, res) {
        try {
            const { id } = req;
            const { pid } = req.params;
            const { title } = req.body;

            if (!pid) {
                return res.status(400).json({ msg: "Post ID is required", success: false });
            }

            const post = await postCollection.findOne({ _id: pid, userId: id });
            if (!post) {
                return res.status(404).json({ msg: "Post not found for the user", success: false });
            }

            post.title = title;
            await post.save();

            return res.status(200).json({ msg: 'Post updated successfully', success: true });

        } catch (err) {
            return res.status(500).json({ msg: `${err.message}`, success: false });
        }
    }

    // Method to delete a post by ID 
    async postDeleteById(req, res ){
        try{
            const { id } = req
            const { pid } = req.params

            const post = await postCollection.findOne({_id: pid, userId:id})

            if(post){
                await postCollection.findByIdAndDelete(pid);
                return res.status(404).json({msg:"post deletion successfull", success:true})
            }
            else{
                return res.status(404).json({msg:"post not found", success:false})
            }
            
        }catch(err){
            res.status(500).json({msg:`${err.message}`, success:false})
        }
    }

    // Method to Like a post
    async postLikes (req, res){
        try{
            const { id } = req
            const { pid } = req.params

            const post =  await postCollection.findOne({_id:pid})
            if(post){
                if(post.likes.includes(id)){
                    post.likes.pull(id)
                    await post.save()
                    return res.status(200).json({msg:"post disliked successfull" , success:true})
                }else{
                    post.likes.push(id)
                    await post.save()
                    return res.status(200).json({msg:"post liked successfull" , success:true})
                }
            }else{
                return res.status(404).json({msg:'post not found', success:false})
            }
        }catch(err){
            res.status(500).json({msg:`${err.message}`, success:false})
        }
    }

    //Method to Commant on a post   
    async postComment (req, res){
        try{
            const { pid } = req.params
            const { comment } = req.body
            const { id } = req
            const post = await postCollection.findOne({_id: pid})
            if(post){
                post.comments.push({user:id, text:comment})
                await post.save()
                // console.log(post.comments.slice(-1).populate({path:'user', select:'name'})
                return res.status(200).json({msg:'post has been commented', success:true})
            }else{
                return res.status(404).json({msg:'cannot commmet the post', success:false})
            }
        }catch(err){
            return res.status(500).json({msg:`${err.message}`, success:false})
        }
    }

    //Method to Get All Posts buy logged in user
    async getAllUserPost (req, res){
        try{
            const _id = req.id
            const posts = await postCollection.find({userId:_id}).populate({ path: 'userId', select: '-password' }).populate({path: 'comments', populate:{path:'user', select:'name, profilePic'}})
            if(posts){
                res.status(200).json({msg:'Post found Successfully', success:true, posts})
            }else{
                res.status(404).json({msg:'No Post found', success:false})
            }
        }catch(error){
            res.status(500).json({msg:`${error.message}`, success:false})
        }
    }
}

export default new PostController();









// import mongoose from "mongoose"
// import postCollection from '../model/postCollentions.js'

// const createPost = async (req, res) => {
//     try{
//         const { id } = req
//         const { pkg } = req.body

//         if (!pkg) {
//             return res.status(400).json({ msg: "Package data is required", success: false });
//         }
    
//         pkg['userId'] = id
   
//         postCollection.create({...pkg}).then((post)=>{
//             res.status(200).json({msg:'post created successfully', success:true, post})
//         }).catch((err)=>{
//             res.status(202).json({msg:'post created unsuccessfull', success:false, err:err.message})
//         })

//     }catch(err){
//         res.status(500).json({msg:`${err.message}`, success:false})
//     }
// }


// const getallPosts = async (req, res)=>{
//     try{
//         const posts = await postCollection.find().populate({path:'userId', select:'-password'})
//         if(posts){
//             res.status(200).json({msg:'fetching post suceessfull', success:true, posts})
//         }else{
//             res.status(202).json({msg:'fetching post unsuccessfull', success:false})
//         }
//     }catch(err){
//         res.status(500).json({msg:`${err.message}`, success:false})
//     }
// }

// const updatePostId = async (req, res) => {
//     try{
//         const { id } = req
//         const {pid} = req.params
//         const { title } = req.body

//         if (!pid) {
//             return res.status(400).json({ msg: "post id is required", success: false });
//         }
//         console.log(id, pid)
//         const post = await postCollection.findOne({_id : pid, userId: id})
//         if(!post){
//             return res.status(404).json({msg:"Post Not found user err", success : false})
//         }
//         console.log(post)
//         post.title = title

//         post.save()

//         return res.status(200).json({msg:'Post Update suceessfull', success:true})


//     }catch(err){
//             return res.status(500).json({msg:`${err.message}`, success:false})
//     }
// }

// export {
//     createPost,
//     getallPosts,
//     updatePostId,
// }