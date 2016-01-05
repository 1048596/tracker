//Graphql and express
var express = require('express');
var path = require('path');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema.js');

var passport = require('passport');
var passConf = require('./config/passport');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('./public'));
app.use(express.static('./node_modules/react-relay/dist/'));

//Passport
var options = {
  name: 'tracker',
  saveUninitialized: true,
  resave: false,
  secret: 'keyboard cat',
  cookie: {
    hello: 'world'
  }
};

app.use(cookieParser('keyboard cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(options));
app.use(session({
  name: 'usr',
  resave: false,
  saveUninitialized: true,
  secret: 'usr'
}));
app.use(passport.initialize());
app.use(passport.session());

//GraphQL server
app.use('/graphql', graphqlHTTP(request => ({
  schema: schema,
  rootValue: { user: request.user },
  pretty: true
})));

//Get
app.get('/asdf', function(req, res) {
  if (!req.user) {
    res.send('Not loggged in');
  }
  if(req.user) {
    res.send('Logged in as ' + req.user.username);
    console.log(req.session);
  }
});
app.get('/setcookie', function(req, res){
  res.cookie('usr', 'pagesize=20', {signed: false, httpOnly: false});
  res.send('Setting Cookie.');
});
app.get('/cookie', function(req, res) {
  res.send(req.session);
  console.log(req.session);
});
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

//Posts
app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));
app.post('/register', function(req, res) {
  console.log(req.body);
});

//Listen
app.listen(1337, () => {
  console.log('Listening on port: 1337');
});
