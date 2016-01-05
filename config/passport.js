var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');
var util = require('util');

var salt = bcrypt.genSaltSync(10);

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  mysql.user(username).then((res) => {
    return done(null, res);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    mysql.user(username).then((user) => {
      console.log('User from db or error: ' + util.inspect(user, false, null));
      if (!user) {
        return done(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        console.log('Wrong password');
        return done(null, false);
      }
      console.log('Logged in');
      return done(null, user);

    });
  }
));
