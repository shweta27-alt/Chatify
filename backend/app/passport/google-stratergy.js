const CustomStrategy = require('passport-custom').Strategy;
const { OAuth2Client } = require('google-auth-library');

let googleAppId = '';
let googleAppSecret = '';


exports.GoogleStrategyName = 'google-web';

exports.GoogleStrategy = new CustomStrategy(async function (req, callback) {
    req.body = req.body || {};
    try{
        callback(null, data);
    } catch (err) {
        callback(err);
        logger.info(err);
    }
});

