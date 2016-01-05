//Bcryptjs
var bcrypt = require('bcryptjs');
var util = require('util');
var salt = bcrypt.genSaltSync(10);

var mysql = require('./mysql');

exports.getIndex = function(req, res) {
  if (!req.user) {
    res.send('Not loggged in');
  }
  if(req.user) {
    res.send('Logged in as ' + req.user.username);
  }
};

exports.getLogin = function(req, res) {
  res.sendFile('/Users/tony/Desktop/wdg/tracker-v1.0.0/public/login.html');
};

exports.getRegister = function(req, res) {
  res.sendFile('/Users/tony/Desktop/wdg/tracker-v1.0.0/public/register.html');
};

exports.postRegister = function(req, res) {
  if (req.body.username.length < 21) {
    var hash = bcrypt.hashSync(req.body.password, salt);
    var user = req.body;
    user.password = hash;

    mysql.register(user).then((value) => {
      console.log(value);
      res.redirect('/login');
    }, (reason) => {
      console.log(reason);
      res.redirect('/register');
    });
  }
};
