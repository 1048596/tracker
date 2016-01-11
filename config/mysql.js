var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'superhacker1',
  database: 'tracker',
  timezone: 'utc',
  multipleStatements: true,
});

/*
Template

return new Promise((resolve, reject) => {
  var sql = '';

  connection.query(sql, id, function(err, results) {
    if (err) console.log(err);

    //addType(results, '');
    resolve(results);
  });
});

*/


function addType(list, type) {
  if (list) {
    var length = list.length;
    for (var i = 0; i < length; i++) {
      list[i].type = type;
    }
  }
}


//Users
exports.user = function(username) {
  return new Promise((resolve, reject) => {
    connection.query('select * from users where username = ?;', username, function(err, results) {
      if (err) {
        resolve(err);
      }
      resolve(results[0]);
    });
  });
};

exports.register = function(obj) {
  return new Promise((resolve, reject) => {
    var sql = 'insert into users set ?';
    connection.query(sql, obj, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

//Mangas
exports.getMangaById = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from mangas where id = ?;';
    connection.query(sql, id, function(err, results) {
      if (err) reject(err);
      //addType(results, 'manga');

      resolve(results);
    });
  });
};

exports.getMangasByGroupId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select m.* from mangas m left join chapters c on m.id = c.manga_id left join chapter_scanlated_by csb on c.id = csb.chapter_id left join groups g on csb.group_id = g.id where g.id = ? group by m.id;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'manga');
      resolve(results);
    });
  });
};

exports.getMangaByTitle = function(title) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from mangas where manga_title = ?';

    connection.query(sql, title, function(err, results) {
      if (err) console.log(err);
      //addType(results, 'manga');
      resolve(results);
    });
  });
};

exports.getMangasByPage = function(page) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from mangas order by manga_title desc limit 3 offset ?;';
    var pagination;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*2;
    }

    connection.query(sql, pagination, function(err, results) {
      if (err) reject(err);
      //addType(results, 'manga');
      resolve(results);
    });
  });
};

//Chapters
exports.getChapterById = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from chapters where id = ?';
    connection.query(sql, id, function(err, results) {
      if (err) reject(err);
      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getChaptersByMangaIdPageAndLimit = function(manga_id, page, limit) {
  return new Promise((resolve, reject) => {
    var pagination;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*limit;
    }

    var sql = 'select * from chapters where manga_id = ? order by chapter_number desc limit ? offset ?';

    var inserts = [manga_id, limit+1, pagination];
    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getChaptersByGroupIdAndPage = function(id, page) {
  return new Promise((resolve, reject) => {
    var sql = 'select c.* from chapters c left join chapter_scanlated_by csb on c.id = csb.chapter_id left join groups g on csb.group_id = g.id where g.id = ? group by c.id desc limit 3 offset ?;';
    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*2;
    }
    var inserts = [id, pagination];
    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getLatestChaptersByPageAndLimit = function(page, limit) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from chapters order by id desc limit ? offset ?';
    var pagination;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*limit;
    }

    var inserts = [limit+1, pagination];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) reject(err);
      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getSubChaptersByUsernameAndPage = function(username, page) {
  return new Promise((resolve, reject) => {
    var pagination;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*2;
    }

    var sql = 'select c.*, m.manga_title from subs s inner join mangas m on m.id = s.manga_id inner join chapters c on c.manga_id = m.id where s.username = ? group by c.id desc limit 3 offset ?;';
    var inserts = [username, pagination];
    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) reject(err);
      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.addChapter = function(chapter_title, chapter_number, manga_title) {
  return new Promise((resolve, reject) => {
    var sql = 'insert into chapters (chapter_title, chapter_number, manga_id, created) select ?, ?, m.id, now() from mangas m where m.manga_title = ?;';
    var inserts = [chapter_title, chapter_number, manga_title];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.getChaptersByMangaAndPage = function(manga_title, page) {
  return new Promise((resolve, reject) => {
    var pagination;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*2;
    }

    var sql = 'select c.* from mangas m join chapters c on m.id = c.manga_id where m.manga_title = ? order by c.chapter_number desc limit 3 offset ?;';
    var inserts = [manga_title, page];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getChaptersByMangaId = function(manga_id) {
  var sql = 'select * from chapters where manga_id = ?';

  connection.query(sql, manga_id, function(err, results) {
    if (err) console.log(err);

    //addType(results, 'chapter');
    resolve(results);
  });
};

//Groups
exports.getGroupById = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from groups where id = ?';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'group');
      resolve(results);
    });
  });
};

exports.getGroupsByMangaId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select g.* from groups g left join chapter_scanlated_by csb on g.id = csb.group_id left join chapters c on csb.chapter_id = c.id left join mangas m on c.manga_id = m.id where m.id = ? group by g.id;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'group');
      resolve(results);
    });
  });
};

exports.getGroupsByChapterId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select g.* from groups g left join chapter_scanlated_by csb on g.id = csb.group_id left join chapters c on csb.chapter_id = c.id where c.id = ? group by g.id;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'group');
      resolve(results);
    });
  });
};


// Creator

exports.getCreatorById = function(id) {
  return new Promise((resolve, reject) => {
    var sql = '';
    var inserts = [id];

    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Artists

exports.getArtistsByMangaId = function(manga_id) {
  return new Promise((resolve, reject) => {
    var sql = 'select a.creator_id, c.creator_name as artist_name from artists a join creators c on a.creator_id = c.id where manga_id = ?';
    var inserts = [manga_id];

    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

//Authors

exports.getAuthorsByMangaId = function(manga_id) {
  return new Promise((resolve, reject) => {
    var sql = 'select a.creator_id, c.creator_name as author_name from authors a join creators c on a.creator_id = c.id where manga_id = ?';
    var inserts = [manga_id];

    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

//Types
exports.getTypeByTypeId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select type from types where id = ?';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Status

exports.getStatusByStatusId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select status from status where id = ?';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

// Genre

exports.getGenresByMangaId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select genre from genres where manga_id = ?';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

// Chapter count

exports.getChapterCountByMangaId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select count(*) as chapter_count from chapters where manga_id = ?';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Permission

exports.getPermissionByGroupIdAndUsername = function(group_id, username) {
  return new Promise((resolve, reject) => {
    var sql = 'select permission from members where group_id = ? && username = ?;';

    var inserts = [group_id, username];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

// Change info

exports.updateManga = function(id, manga_title, descript, authors, artists, status, type, genres) {
  return new Promise((resolve, reject) => {
    var sql = (`UPDATE mangas SET manga_title = ?, descript = ?,
       status = ?, type = ?, edited = now() where id = ?;`);

    sql = mysql.format(sql, [manga_title, descript, status, type, id]);

    var authorsSql = '';
    var artistsSql = '';
    var genresSql = '';

    for (var i = 0; i < authors.length; i++) {
      authorsSql = authorsSql + 'INSERT INTO authors (manga_id, creator_id) values (?, ?);'
      authorsSql = mysql.format(authorsSql, [id, authors[i]]);
    }

    for (var i = 0; i < artists.length; i++) {
      artistsSql = artistsSql + 'INSERT INTO artists (manga_id, creator_id) values (?, ?);'
      artistsSql = mysql.format(artistsSql, [id, artists[i]]);
    }

    for (var i = 0; i < genre.length; i++) {
      genresSql = genresSql + 'INSERT INTO genres (manga_id, genre) values (?, ?);'
      genresSql = mysql.format(genresSql, [id, genre[i]]);
    }

    /* To remove a group, you need to remove all the chapters from the group.
    for (var i = 0; i < groups.length; i++) {
      groupsSql = groupsSql + 'INSERT INTO chapter_scanlated_by (chapter_id, group_id) values (?, ?);'
      groupsSql = mysql.format(groupsSql, [id, groups[i]]);
    }*/

    sql = sql + authorsSql + artistsSql + genresSql;

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};
