'use strict';

const passport = require('passport');
const { LocalStrategy } = require('./local-stratergy');
const {
    GoogleStrategyName,
    GoogleStrategy,
} = require('./google-stratergy');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(LocalStrategy);

passport.use(GoogleStrategyName, GoogleStrategy);



module.exports = passport;
