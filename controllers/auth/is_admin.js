var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    
    if(req.user.admin)
        next();

    res.status(401).send('Unauthorized');
};