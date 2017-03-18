var User = require('../../models/user');

module.exports = function(req, res) {
    
    console.log('DELETE_USER: ', req.user);

    User.findOneAndRemove({ _id: req.body._id }, function(err) {
        if(err) throw err;

        res.clearCookie('jwt_token').json({success: true, message: 'User deleted'}).end();
    })
};