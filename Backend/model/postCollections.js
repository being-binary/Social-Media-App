import mongoose from "mongoose"

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    media: [{
        public_id : String,
        secure_url: String
    }],
    description: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required:true
        }
    ],
    comments: [
        {
            createdAt: {
                type: Date,
                default: Date.now
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required:true
            },
            text: {
                type: String
            },
            reply: [
                {
                    createdAt: {
                        type: Date,
                        default: Date.now
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'users',
                        required:true
                    },
                    text: {
                        type: String
                    },
                    likes: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'users',
                            required:true

                        }
                    ]
                }
            ]
        }
    ],
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
}, { timestamps: true })


const Post = mongoose.model('Post', PostSchema)

export default Post


// const mongoose = require('mongoose');
// const postSchema = new mongoose.Schema({
//     title:{
//         type:String
//     },
//     file:[],
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'users'
//     },
//     likes:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'users'
//         }
//     ],

//     comments:[
//         {
//             user:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref:'users'
//             },
//             text:{
//                 type:String
//             },
//             createdAt:{
//                 type:Date,
//                 default:Date.now
//             },
//             reply:[],
//             commentLikes:[
//                 {
//                     type:mongoose.Schema.Types.ObjectId,
//                     ref:'users'
//                 }
//             ]
//         }
//     ]


// },{timestamps:true})

// export default mongoose.model('posts' ,postSchema )