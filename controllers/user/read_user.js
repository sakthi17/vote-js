var User = require('../../models/user');

module.exports = function(req, res) {
    
    console.log('READ_USER: ', req.user);

    if(req.user.logged_in) {
        var user = User.findOne({ _id: req.user._id }, function(err, user){
            if(err) throw err;

            res.json({
                response: {
                    success: true,
                    message: 'Read User Successful'
                },
                user: {
                    username: user.username,
                    _id: user._id,
                    admin: user.admin,
                    isLoggedIn: true
            }}).end();
        }); 
    } else {
        console.log('READ USER: ', req.ip);
        res.json({
            response: {
                success: false,
                message: 'Annonymous User'
            },
            user: {
                username: 'annon',
                _id: req.ip,
                admin: false,
                isLoggedIn: false
        }}).end();
    }

};