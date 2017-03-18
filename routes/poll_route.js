var express = require('express');
var router = express.Router();

var is_logged_in = require('../controllers/auth/is_logged_in');

var create_poll = require('../controllers/poll/create_poll');
var read_polls = require('../controllers/poll/read_polls');
var vote_poll = require('../controllers/poll/vote_poll');
var delete_poll = require('../controllers/poll/delete_poll');

var jwt = require('jwt-simple');

//create poll
router.post('/create_poll', is_logged_in, create_poll);

//read polls
router.get('/read_polls', read_polls);

//update poll

//delete poll
router.post('/delete_poll', is_logged_in, delete_poll);

//vote on poll
router.post('/vote_poll', is_logged_in, vote_poll);

//vote on poll

module.exports = router;