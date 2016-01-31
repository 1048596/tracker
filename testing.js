var GraphQL = require('graphql/utilities');
var Relay = require('graphql-relay');
var dotProp = require('dot-prop');
var mysql = require('/Users/1048596/Desktop/tracker/config/mysql.js');
var GraphQLRelay = require('graphql-relay');

var arr = [
  { id: 1 },
  { id: 2 }
];
/*
(function() {
  new Promise((resolve, reject) => {
    mysql.getAuthorsByMangaId(2).then((authors) => {
      resolve(authors);
    });
  }).then((authors) => {
    mysql.getAuthorById(1).then((author) => {
      console.log(authors);
      console.log(author);
    });
  });
})();

*/
(function() {
  new Promise((resolve, reject) => {
    mysql.getAuthorsByMangaId(2).then((authors) => {
      console.log(authors);
      resolve(authors);
    });
  }).then((authors) => {
    mysql.getAuthorById(2).then((author) => {
      var obj = arr[1];
      var obj2 = { id: 2 };
      console.log(obj);
      console.log(obj2);
      console.log(GraphQLRelay.cursorForObjectInConnection(arr, obj));
      console.log(GraphQLRelay.cursorForObjectInConnection(arr, obj2));
      console.log(GraphQLRelay.offsetToCursor(1));
      console.log(author[0]);
    });
  });
})();

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
