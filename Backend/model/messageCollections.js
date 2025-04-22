import { timeStamp } from 'console'
import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({

    sender: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    receiver:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    message:{
        type:String
    },
    files:[{
        public_id : String,
        secure_url: String
    }]

},{timeStamp})

const Messages = mongoose.model('messages', messageSchema)

export default Messages