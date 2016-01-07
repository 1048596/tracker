var mysql = require('./config/mysql.js');
var moment = require('moment');
var Relay = require('graphql-relay');

mysql.getPermissionByGroupIdAndUsername(1, 'asdf').then((value) => {
  console.log(value);
});
