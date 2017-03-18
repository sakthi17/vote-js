var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //email: { type: String, required: false, unique: true },
    admin: Boolean,
    polls_created: [String],
    polls_voted: [String],
    polls_liked: [String],
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            console.log('HASH: ' + hash);
            next(); 
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        console.log('ISMATCH: ' + isMatch);
        cb(null, isMatch);
    })
}

var User = db.model('User', userSchema, 'poll_user');

module.exports = User;