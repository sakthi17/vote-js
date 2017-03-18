var jwt = require('jwt-simple');

module.exports = function (user, res) {

    var minutes = 15;

    var d = new Date();
    //current time in milliseconds from epoch
    d = d.getTime();

    //seconds
    var payload = {
        sub: user._id, 
        admin: user.admin, 
        exp: (d / 1000 + 60 * minutes)
    };

    var token = jwt.encode(payload, process.env.JWT_SECRET);

    //milliseconds
    console.log('TOKEN SENT');
    res.cookie('jwt_token', token, { maxAge: d + 1000 * 60 * minutes, httpOnly: true });

}