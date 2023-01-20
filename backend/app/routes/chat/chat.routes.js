const express = require("express");
const router = express.Router();
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

router.post("/access-chat", async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Inavlid userId send" });
  }

  console.log(req.user);
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
      select: "fullname profilepic email",
    });
    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
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

router.get("/fetch-chat", async (req, res, next) => {
  let userId = req.user._id;
  try {
    let result = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    result = await User.populate(result, {
      path: "latestMessage.sender",
      select: "fullname profilepic email",
    });
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/group", async (req, res, next) => {
  if (!(req.body.users || req.body.name)) {
    return res.status(200).json({ message: "Please fill the required field" });
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "Atleast two users are required to form a group" });
  }
  users.push(req.user._id);

  try {
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

router.put("/rename", async (req, res, next) => {
  let { chatName, chatId } = req.body;
  try {
    let upadteChat = await Chat.findOne({ _id: chatId });
    upadteChat.chatName = chatName;
    let chat = await upadteChat.save();
    let getUpdateChat = await Chat.find({ _id: chat._id })
      .populate("users")
      .populate("groupAdmin");
    if (!getUpdateChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ getUpdateChat });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.put("/group-add", async (req, res, next) => {
  let { chatId, userId } = req.body;
  try {
    let groupChat = await Chat.findOne({ _id: chatId });
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

router.put("/group-remove", async(req,res, next)=>{
  let { chatId, userId } = req.body;
  try {
    let groupChat = await Chat.findOne({ _id: chatId });
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
