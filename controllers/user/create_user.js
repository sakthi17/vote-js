var User = require('../../models/user');
var path = require('path');
var sendToken = require('../auth/send_token');

module.exports = function(req, res) {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: false,
        polls_voted: [],
        polls_liked: [],
        created_at: new Date(),
        updated_at: new Date()
    });
    
    newUser.save(function(err) {
        if(err) throw err;

        console.log('User created!');

        sendToken(newUser, res);

        res.json({
            response: { 
                success: true, 
                message: 'User Created!'
            },
            user: {
                username: newUser.username,
                _id: newUser._id,
                admin: newUser.admin,
                isLoggedIn: true
            }
        }).end();
    });
};