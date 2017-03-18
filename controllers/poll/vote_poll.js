var Poll = require('../../models/poll');

module.exports = function(req, res) {

    console.log('IN VOTE POLL');

    console.log(req.body);

    Poll.findById(req.body.poll_id,
        function(err, _poll) {
            if(err)
                res.json({success: false, message: err}).end();

            updatedVotes = _poll.votes.slice();
            updatedVotes.push(req.body.user_id);

            updatedCounts = _poll.counts.slice();
            updatedCounts[req.body.vote_index]++;

            updatedTotalVotes = _poll.totalVotes;
            updatedTotalVotes++;
            
            console.log(_poll.counts, updatedCounts);

            console.log('INSIDE VOTE_POLL: ', _poll);

            _poll.update({votes: updatedVotes, counts: updatedCounts, totalVotes: updatedTotalVotes}, function(err) {
                if(err)
                    res.json({success: false, message: err}).end();

                res.json({success: true, message: 'vote submitted'});
            })
        }
    );
};