var express = require('express');
var router = express.Router();

var user_route = require('./user_route');
var poll_route = require('./poll_route');

router.use('/user', user_route);

router.use('/poll', poll_route);

module.exports = router;