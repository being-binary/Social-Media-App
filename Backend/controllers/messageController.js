import ConversationCollection from "../model/converstionCollection.js"
import MessagesCollection from "../model/messageCollections.js"

class MessagesController {

    async SendMessage(req, res){
        try{
            const { id } = req
            const { fid } = req.params
            const { messages }  = req.body

            let conversation = await ConversationCollection.findOne({members:{$all:[id, fid]}})
            
            const message = await MessagesCollection.create({sender:id, receiver:fid, message:messages})

            if(!conversation){
                conversation = await ConversationCollection.create({members:[id,fid]}) 
            }

            conversation.message.push(message._id)
            
            await conversation.save()
            res.status(201).json({msg:"message send successfully", success:false})

        }catch(error){
            res.status(500).json({msg:error.message, success:false})
        }
    }

    async GetMessages(req, res) {
        try {
            const { id } = req;  // Logged-in user id
            const { fid } = req.params;  // Friend or target user id
            // Check if fid is provided
            if (!fid) {
                return res.status(400).json({ msg: 'Friend ID (fid) is required', success: false });
            }
    
            // Find the conversation between the two users (uid and fid)
            const conversation = await ConversationCollection.findOne({
                members: { $all: [id, fid] }
            })
                .populate({ path: 'members', select: '-password' })  // Populate members, excluding password
                .populate({
                    path: 'message',
                    populate: [
                      { path: 'sender', select: 'name profilePic' },
                      { path: 'receiver', select: 'name profilePic' }
                    ]
                });  // Populate messages in the conversation
    
            if (!conversation) {
                // If no conversation is found
                return res.status(200).json({ msg: 'Conversation not found', success: true , data : conversation });
            }
    
            // Return the conversation details (messages and participants)
            return res.status(200).json({
                msg: 'Conversation retrieved successfully',
                success: true,
                data: conversation
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: 'An error occurred while fetching messages',
                success: false,
                error: error.message
            });
        }
    }
    
    async GetMessagesByUser(req, res){
        try{
            const { id } = req
            
            const messages = await ConversationCollection.find({members:id}).populate({ path: 'members', select: '_id name profilePic' }).populate({ path: 'message', select: 'message createdAt'})
            
            messages.forEach(conversation => {
                conversation.message = conversation.message.slice(-1);
            });

            if(messages.length>0){
                return res.status(200).json({msg:'message found successfull', success:true, messages})
            }
            else{
               return  res.status(404).json({msg:'message not found unsuccessfull', success:false})
            }

        }catch(error){
            return res.status(500).json({msg:error.message, success:false})
        }
    }
}

export default new MessagesController()