require('dotenv').config( {path: './config/.env'} );

var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./controllers/auth/login');
var logout = require('./controllers/auth/logout');
var check_token = require('./controllers/auth/check_token');
var api = require('./routes/api_route');

var app = express();

app.use(logger('tiny'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/happy_face.png', function(req, res) {
    res.sendFile(path.join(__dirname, 'happy_face.png'));
});

app.get('/check_mark.png', function(req, res) {
    res.sendFile(path.join(__dirname, 'check_mark.png'));
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.post('/login', login);
app.post('/logout', logout);

//mutates req, adds req.user with user information
//authenticates using jwt-simple and cookies

app.use(check_token);

app.use('/api', api);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});