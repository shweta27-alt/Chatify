const session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb+srv://shweta277:Poiuytrewq%4012345@cluster0.dbc32st.mongodb.net/Chatify?retryWrites=true&w=majority',
    collection: 'sessions'
});

//express session middleware
const sessionMW = async (req, res, next) => {
    let sessionMiddleware;
    const maxAge = 30000000; //max age of user session
    sessionMiddleware = session({
        name: 'c.session',
        secret: 'c.secret',
        store: store, // mongo db as session storage 
        resave: true,
        proxy: true,
        rolling: true,   //roll the session from current date to maxage
        saveUninitialized: false,
        cookie: {
            secure: true,
            path: '/',
            sameSite: 'none',
            maxAge,
            domain: `chatify-app-zeta.vercel.app`, 
            // domain: `localhost`,
        },
    });

    sessionMiddleware(req, res, next);
};

module.exports = sessionMW;
