const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { getChatifyDb } = require("../mongoose.init");
let chatifyDb = getChatifyDb();

const Chat = new Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  //ref to user model in populate
      },
    ],
    chatName: {
      type: String,
      trim: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //ref to user model in populate
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message", //ref to message model in populate
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

Chat.statics.getChat = async function getChat() {};

module.exports = chatifyDb.model("chat", Chat);
