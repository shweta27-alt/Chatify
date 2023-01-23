const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')
const { getChatifyDb } = require('../mongoose.init');
let chatifyDb = getChatifyDb();


const phoneNumber = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    countryCode: {
        type: Number,
        required: true,
    }
},
    { _id: false }
)

const User = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/dkidih85l/image/upload/v1674412574/ip8qhnt3cxuhx6pftlip.png"
        },

        profileBio: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        mobile: {
            type: [phoneNumber],
        },
        archive: {
            default: false,
            type: Boolean,
            required: true,
        }

    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
    }
);

User.plugin(passportLocalMongoose, {
    iterations: 1000,
    keylen: 256,
    usernameUnique: false,
    errorMessages: {
        NoSaltValueStoredError: 'No password is set for this account',
    },
});

User.statics.getUserByPhoneNumber = async function getUserByPhoneNumber(phoneNumber, countryCode) {
    const User = this.model("user")
    return User.findOne({ mobile: { $elemMatch: { phoneNumber: `${phoneNumber}`, countryCode: countryCode } } })

};

User.statics.getUserByEmail = async function getUserByEmail(emailAddress) {
    const User = this.model("user")
    return User.findOne({ email: `${emailAddress}` })
}

User.statics.getUserByQuery = async function getUserByQuery(query,userid) {
    const User = this.model("user")
    return User.find(query).find({_id:{$ne:userid}})
}


module.exports = chatifyDb.model('user', User);
