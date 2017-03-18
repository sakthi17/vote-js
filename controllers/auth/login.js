var User = require('../../models/user');
var path = require('path');
var sendToken = require('./send_token');

module.exports = function(req, res) {
    console.log('IN LOGIN.JS');

    var body = req.body;

    User.findOne({username: body.username}, function(err, user) {
        if(err) throw err;

        if(user) {
            user.comparePassword(body.password, function(err, isMatch){
                if(err) throw err;

                if(isMatch) {
                    sendToken(user, res);

                    var userObj = {
                        response: {
                            success: true,
                            message: 'Login Successful'
                        },
                        user: {
                            username: user.username,
                            _id: user._id,
                            admin: user.admin,
                            isLoggedIn: true
                        }
                    }

                    res.json(userObj);
                    return;
                }
                else {
                    res.json({response: {success: false, message: 'Incorrect Password'}});
                    return;
                }
            });
        } else {
            res.json({response: {success: false, message: 'Username not found'}});
        }
        
    })
};