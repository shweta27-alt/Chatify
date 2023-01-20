const AuthenticationRouter = require('./authentication');
const ChatRouter = require('./chat');
const { sessionMW, passport, sessionLoginLogout } = require('../middlewares');
const { passportInitMW, passportSessionMW } = passport;


module.exports = (app) => {
    app.use(
        `/authentication`,
        [
            sessionMW,
            passportInitMW,
            passportSessionMW,
            sessionLoginLogout,
        ],
        AuthenticationRouter
    );
    app.use(
        `/chat`,
        [
            sessionMW,
            passportInitMW,
            passportSessionMW,
            sessionLoginLogout,
        ],
        ChatRouter
    );
};