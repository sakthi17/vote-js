var Poll = require('../../models/poll');

module.exports = function(req, res) {

    console.log('IN CREATE_POLL');

    var newPoll = new Poll({
        title: req.body.title,
        categories: req.body.categories,
        counts: (new Array(req.body.categories.length).fill(0)),
        totalVotes: 0,
        totalLikes: 0,
        created_by_id: req.body.created_by_id,
        created_by_username: req.body.created_by_username,
        created_at: new Date(),
        updated_at: new Date()
    });
    
    newPoll.save(function(err) {
        if(err) throw err;

        console.log('Poll created!');

        console.log(newPoll);

        res.status(200).end();
    });
};