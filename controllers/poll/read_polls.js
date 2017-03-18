var Poll = require('../../models/poll');

module.exports = function(req, res) {
    
    var polls = Poll.find({}).sort({'created_at':-1}).exec(function(err, polls){
        res.json(polls);
    });
};