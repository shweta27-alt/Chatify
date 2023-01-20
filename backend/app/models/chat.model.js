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
        ref: "user",
      },
    ],
    chatName: {
      type: String,
      trim: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

Chat.statics.getChat = async function getChat() {};

module.exports = chatifyDb.model("chat", Chat);
