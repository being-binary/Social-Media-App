import mongoose from 'mongoose'

const convserationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],

    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'messages'
        }
    ]

})

const Conversation = mongoose.model('conversation', convserationSchema)

export default Conversation