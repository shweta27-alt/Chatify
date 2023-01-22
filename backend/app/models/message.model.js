const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { getChatifyDb } = require('../mongoose.init');
let chatifyDb=getChatifyDb();

const Message = new Schema(
    {
        readby :{
            type: Array,
            
        },

        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        content:{
            type: String,
            
        },
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"chat"
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
    }
);

Message.statics.getChat = async function getChat() {
};

module.exports = chatifyDb.model('message', Message);
