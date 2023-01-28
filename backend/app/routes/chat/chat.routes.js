const express = require("express");
const router = express.Router();
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const {checkAuthenticated} = require('../../middlewares')


// route to create a chat for a user
router.post("/create-chat",checkAuthenticated, async (req, res, next) => {
  const { userId } = req.body;
  //if user id is not present 
  if (!userId) {
    return res.status(400).json({ message: "Inavlid userId send" });
  }
  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "lastestMessage.sender",
      select: "fullName profilePic email",
    });
    // if chat is present return the chat
    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
      //Else create a chat for user
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      let chatInstance = new Chat(chatData);
      let response = await chatInstance.save();
      let fullChat = await Chat.findOne({ _id: response._id }).populate(
        "users"
      );

      return res.status(200).json({ fullChat });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//route to fetch all chat for current user
router.get("/fetch-chat",checkAuthenticated, async (req, res, next) => {
  let userId = req.user._id;
  try {
    let result = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ modified_at: -1 });
    result = await User.populate(result, {
      path: "latestMessage.sender",
      select: "fullName profilePic email",
    });
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// route to create a group for user
router.post("/group",checkAuthenticated, async (req, res, next) => {
  if (!(req.body.users || req.body.name)) {
    return res.status(400).json({ message: "Please fill the required field" });
  }
  let users = JSON.parse(req.body.users);
  //check for users it should be greater then 2 to create a group
  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "Atleast two users are required to form a group" });
  }

  //push current logged in user to group 
  users.push(req.user._id);

  try {
    //create a group
    let groupChatInstance = new Chat({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });
    let groupChat = await groupChatInstance.save();
    let getGroupChat = await Chat.find({ _id: groupChat._id })
      .populate("users")
      .populate("groupAdmin");
    return res.status(200).json({ getGroupChat });
  } catch (error) {
    return res.status(400).json(error);
  }
});

//route to rename a group for a user
router.put("/rename", async (req, res, next) => {
  let { chatName, chatId } = req.body;
  try {
    let upadteChat = await Chat.findOne({ _id: chatId });
    //rename existing chat name
    upadteChat.chatName = chatName;
    let chat = await upadteChat.save();
    let getUpdateChat = await Chat.find({ _id: chat._id })
      .populate("users")
      .populate("groupAdmin");
      //if not chat found return with error
    if (!getUpdateChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ getUpdateChat });
  } catch (error) {
    return res.status(400).json(error);
  }
});


//route to add a user to  group
router.put("/group-add",checkAuthenticated, async (req, res, next) => {
  let { chatId, userId } = req.body;
  try {
    let groupChat = await Chat.findOne({ _id: chatId });
    //add userid to existing users
    groupChat.users = [...groupChat.users, userId];
    let chat = await groupChat.save();
    let getGroupChat = await Chat.find({ _id: chat._id })
      .populate("users")
      .populate("groupAdmin");
    if (!getGroupChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ getGroupChat});
  } catch (error) {
    return res.status(400).json(error);
  }
});

//route to remove a user from group 
router.put("/group-remove",checkAuthenticated, async(req,res, next)=>{
  let { chatId, userId } = req.body;
  try {
    let groupChat = await Chat.findOne({ _id: chatId });
    //remove userid to existing users
    let removeUserIndex = groupChat.users.indexOf(userId)
    groupChat.users.splice(removeUserIndex,1) 
    let chat = await groupChat.save();
    let getGroupChat = await Chat.find({ _id: chat._id })
      .populate("users")
      .populate("groupAdmin");
    if (!getGroupChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ getGroupChat});
  } catch (error) {
    return res.status(400).json(error);
  }
})



module.exports = router;
