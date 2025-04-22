import usercollection from '../model/userCollections.js'
import postcollection from '../model/postCollections.js'

class Action {

    async findUserByIdWithDetailsAndPosts(req, res) {
        const friend_id  = req.params.fid
        if (req.id && friend_id) {
            try {
                const friend_details = await usercollection.findById(friend_id).select('-password')
                const friend_posts = await postcollection.find({userId:friend_id}).populate({ path: 'userId', select: '-password' }).populate({path: 'comments', populate:{path:'user', select:'-password'}});
                // console.log(friend_details, friend_posts)
                res.status(200).json({msg:'user found successfully', success:true, details:{ user : friend_details, posts: friend_posts}})
            } catch (error) {
                res.status(400).json({msg:error.message, success:false})
            }
        } else {
            res.status(401).json({ msg: 'user not found', success: false })
        }

    }

    async findUserByName(req, res) {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ msg: "Name is required", success: false });
            }
    
            const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
            const users = await usercollection.find({ "name.firstName": regex }).select("name.firstName name.lastName profilePic");
    
            if (users.length > 0) {
                res.status(200).json({ msg: 'Users found successfully', success: true, users });
            } else {
                res.status(404).json({ msg: 'No users found', success: false });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message, success: false });
        }
    }
    
}


export default new Action()