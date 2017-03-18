var express = require('express');
var router = express.Router();

var jwt = require('jwt-simple');

var is_admin = require('../controllers/auth/is_admin');

var create_user = require('../controllers/user/create_user');
var read_user = require('../controllers/user/read_user');
var delete_user = require('../controllers/user/delete_user');
var logout = require('../controllers/auth/logout')


router.post('/create_user', create_user);

router.get('/read_user', read_user);

router.post('/delete_user', delete_user);

module.exports = router;