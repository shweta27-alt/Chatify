const mongoose = require('mongoose');

let chatifyDb;

function createConnection(dbURL, name, options) {
    let db = mongoose.createConnection(dbURL, options);
    db.on('connected', function () {
        console.log(`${name} connected`);
    });
    return db;
}

//connect mongo db 
function connect() {
    chatifyDb = createConnection(
        'mongodb://127.0.0.1:27017/chatifyDb',
        'chatifyDb'
    );
}



module.exports = {
    getChatifyDb: () => chatifyDb,
    connect,
};