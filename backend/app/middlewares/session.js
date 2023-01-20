const session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/chatifyDb',
    collection: 'mySessions'
  });

const sessionMW = async (req, res, next) => {
    let sessionMiddleware;
    let domain=req.get('host')
    const maxAge = 30000000;
    sessionMiddleware = session({
        name: 'c.session',
        secret: 'c.secret',
        store: store,
        resave: true,
        proxy: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            // secure: 'auto',
            path:'/',
            // sameSite: 'none',
            maxAge,
            domain: `localhost`,
        },
    });

    sessionMiddleware(req, res, next);
};

module.exports = sessionMW;
