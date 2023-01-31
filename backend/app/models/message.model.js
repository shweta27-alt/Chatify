const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { getChatifyDb } = require('../../mongoose.init');
let chatifyDb=getChatifyDb();

const Message = new Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user" //ref to user model in populate
        },
        content:{
            type: String,
            
        },
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"chat" //ref to chat model in populate
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
    }
);

Message.index({sender:1})
Message.index({chat:1})

Message.statics.getChat = async function getChat() {
};

module.exports = chatifyDb.model('message', Message);
