var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var pollSchema = new Schema({
    title: { type: String, required: true, unique: false },
    categories: [String],
    counts: [Number],
    votes: [String],
    likes: [String],
    totalVotes: { type: Number, default: 0},
    totalLikes: { type: Number, default: 0},
    created_by_id: { type: String, required: true},
    created_by_username: { type: String, required: true},
    created_at: Date,
    updated_at: Date
});

var Poll = db.model('Poll', pollSchema, 'polls');

module.exports = Poll;