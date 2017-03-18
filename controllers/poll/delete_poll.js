var Poll = require('../../models/poll');

module.exports = function(req, res) {
    
    console.log('DELETE_Poll: ', req.user);
    console.log('pollID: ', req.body.pollID);
    console.log('userID: ', req.body.userID);
    console.log('create_by_id: ', req.body.create_by_id);

    if(req.body.pollID) {
        Poll.findOneAndRemove({ _id: req.body.pollID, created_by_id: req.body.userID }, function(err) {
            if(err)
                res.json({success: false, message: err}).end();
            else
                res.json({success: true, message: 'Poll deleted'}).end();
        })
    }

    else if(req.body.created_by_id) {
        Poll.remove({created_by_id: req.body.created_by_id}, function(err) {
            if(err)
                res.json({success: false, message: err}).end();
            else
                res.json({success: true, message: 'Polls deleted'}).end();
        });
    }
};