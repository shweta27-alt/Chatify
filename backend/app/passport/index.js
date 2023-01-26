'use strict';

const passport = require('passport');
const { LocalStrategy } = require('./local-stratergy');
const {
    GoogleStrategyName,
    GoogleStrategy,
} = require('./google-stratergy');

//add user data to the session in mongodb
passport.serializeUser(function (user, done) {
    done(null, user);
});
//the respective user correspond to sessionid is attached to req.user
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(LocalStrategy);

passport.use(GoogleStrategyName, GoogleStrategy);



module.exports = passport;
