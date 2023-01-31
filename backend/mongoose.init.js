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
        'mongodb+srv://shweta277:Poiuytrewq%4012345@cluster0.dbc32st.mongodb.net/Chatify?retryWrites=true&w=majority',
        'chatifyDb'
    );
}



module.exports = {
    getChatifyDb: () => chatifyDb,
    connect,
};