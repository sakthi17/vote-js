var jwt = require('jwt-simple');

module.exports = function(req, res, next) {

    req.user = {
        _id: '',
        admin: '',
        logged_in: false
    };
    
    var cookies = req.cookies;

    if(Object.hasOwnProperty.call(cookies, 'jwt_token')) {
        //decode jwt_token
        try {
            var decoded = jwt.decode(cookies.jwt_token, process.env.JWT_SECRET);
            req.user['_id'] = decoded.sub;
            req.user.admin = decoded.admin;
            req.user.logged_in = true;
            console.log('CHECK TOKEN: ', req.user);
        }
        catch(err) {
            console.log('Token expired');
            res.clearCookie('jwt_token');
            console.log('Token destroyed');
            req.user['_id'] = req.ip;
            req.user.admin = false;
            req.user.logged_in = false;
            console.log('CHECK TOKEN: ', req.user);
        }
        next();

    } else {
        console.log('check_token: no token');
        
        req.user['_id'] = req.ip;
        req.user.admin = false;
        req.user.logged_in = false;

        console.log('CHECK TOKEN: ', req.user);
        next();
    }
};