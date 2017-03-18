var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    
    console.log('IN IS_USER');

    if(req.user._id !== 'annon')
        next();
    else
        res.status(401).send('Unauthorized');
};