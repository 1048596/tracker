var mysql = require('./config/mysql.js');
var moment = require('moment');

mysql.getAuthorsByMangaId(2).then((value) => {
  console.log(value);
});
