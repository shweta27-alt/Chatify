const express = require('express');
const router = express.Router();
const Message = require('../../models/message.model')
const User = require('../../models/user.model')
const Chat = require('../../models/chat.model')

router.post('/message', async (req, res, next) => {
    let {content, chatId} = req.body
    if(!(content || chatId)){
        return res.status(400).json({message:"Invalid data"})
    }
    let newMessage = {sender:req.user._id, content: content,chat: chatId}
    // return res.status(200).json({success:true});

    try{
      let messageInstance = new Message(newMessage)
      let response = await messageInstance.save()
      let message = await response.populate("sender","fullName profilePic")
      message = await message.populate("chat")
      message = await User.populate(message,{path:"chat.users", select:"fullName profilePic email"})
      let userChat = await Chat.findOne({_id:chatId})
      userChat.latestMessage = message
      await userChat.save()
      return res.status(200).json(message)
    }
    catch(error){
        return res.status(400).json({message: error})
    }

});


router.get('/message',async(req,res,next)=>{
   let chatId = req.query.chatId;
   try{
      const message = await Message.find({chat:chatId}).populate("sender","fullName profilePic email").populate("chat")
      return res.status(200).json(message)
   } 
   catch(error){
     return res.status(400).json({message: error})
   }
})


module.exports = router;