var GraphQL = require('graphql/utilities');
var schema = require('./schema/mangaType.js');
var Relay = require('graphql-relay');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'superhacker1',
  database: 'tracker',
  timezone: 'utc',
  multipleStatements: true,
});

//console.log(Relay.fromGlobalId('Q2hhcHRlcjpRMmhoY0hSbGNqbzJPQT09').id);

connection.query('select descript from mangas where id = 4;', function(err, value) {
  console.log(value);
});
