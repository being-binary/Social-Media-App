import { genSaltSync } from "bcryptjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            minLenght: [3, 'minimun length should be greater then 3 char']
        },
        lastName: {
            type: String,
            required: true,
            minLenght: [3, 'minimun length should be greater then 3 char']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'this is bio'
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            }
        ]
    },
    followings: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            }
        ]
    },
    profilePic :{
       secure_url:{
        type:String,
        default:'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg'
       },
       asset_id:{
        type:String,
       }
    }
}, { timestamps: true })

userSchema.add({
    resetpasswordtoken: { type: String }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    try {
        const salt = genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
        next();
    } catch (err) {
        next(err)
    }
})

const users = mongoose.model('users', userSchema)

export default users