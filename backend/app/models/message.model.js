const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { getChatifyDb } = require('../mongoose.init');
let chatifyDb=getChatifyDb();

const Message = new Schema(
    {
        readby :{
            type: Array,
            required:true,
        },

        sender:{
            type: mongoose.Schema.Types.ObjectId,
            required:true
        },
        content:{
            type: String,
            required:true,
        },
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
    }
);

Message.statics.getChat = async function getChat() {
};

module.exports = chatifyDb.model('message', Message);
