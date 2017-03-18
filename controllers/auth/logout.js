var User = require('../../models/user');
var path = require('path');
var sendToken = require('./send_token');

module.exports = function(req, res) {
    console.log('IN LOGOUT.JS');

    res.clearCookie('jwt_token').end();
};