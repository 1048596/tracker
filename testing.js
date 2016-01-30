var GraphQL = require('graphql/utilities');
var schema = require('./schema/mangaType.js');
var Relay = require('graphql-relay');
var dotProp = require('dot-prop');

var arr = [
  { id: 1 },
  { id: 2 }
];


console.log(dotProp.get(arr[1], 'id'));





/*
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

connection.query('select id from mangas where id = 2;', function(err, value) {
  console.log(value);
});

var mysql = require('/Users/1048596/Desktop/tracker/config/mysql.js');

mysql.searchGenresByGenre('').then((value) => {
  console.log('yo');
  console.log(value);
});

*/
