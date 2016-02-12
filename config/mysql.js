var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'superhacker1',
  database: 'tracker',
  timezone: 'utc',
  dateStrings: 'TIMESTAMP',
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

// Mangas
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
    var sql = `select m.* from mangas m
    left join chapters c on m.id = c.manga_id
    left join chapters_groups cg on c.id = cg.chapter_id
    left join groups g on cg.group_id = g.id
    where g.id = ? group by m.id;`;

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

    var inserts = [manga_id, limit + 1, pagination];
    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'chapter');
      resolve(results);
    });
  });
};

exports.getChaptersByGroupIdAndPage = function(id, page, limit) {
  return new Promise((resolve, reject) => {
    var sql = `select c.* from chapters c
    left join chapters_groups cg on c.id = cg.chapter_id
    left join groups g on cg.group_id = g.id
    where g.id = ? group by c.id desc limit ? offset ?;`;

    if (page === 0) {
      pagination = 0;
    } else {
      pagination = page*limit;
    }

    var inserts = [id, limit + 1, pagination];
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
    var sql = 'insert into chapters (chapter_title, chapter_number, manga_id, created) select ?, ?, m.id, UTC_TIMESTAMP() from mangas m where m.manga_title = ?;';
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
    var sql = `select g.* from groups g
    left join chapters_groups cg on g.id = cg.group_id
    left join chapters c on cg.chapter_id = c.id
    left join mangas m on c.manga_id = m.id where m.id = ? group by g.id;`;

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      //addType(results, 'group');
      resolve(results);
    });
  });
};

exports.getGroupsByChapterId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = `select g.* from groups g
    left join chapters_groups cg on g.id = cg.group_id
    left join chapters c on cg.chapter_id = c.id
    where c.id = ? group by g.id;`;

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
    var sql = 'select creator_name from creators where id = ?';

    sql = mysql.format(sql, [id]);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.searchCreatorsByName = function(name) {
  return new Promise((resolve, reject) => {
    var sql = (`
      select * from creators
        where creator_name LIKE ?
        ORDER BY CASE
          WHEN creator_name LIKE ? THEN 0
          WHEN creator_name LIKE ? THEN 1
          ELSE 2
        END
        limit 5;`);

    sql = mysql.format(sql, ['%' + name + '%', name + '%', '%' + name]);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Artists

exports.getArtistsByMangaId = function(manga_id) {
  return new Promise((resolve, reject) => {
    //var sql = 'select a.creator_id, c.creator_name as artist_name from artists a join creators c on a.creator_id = c.id where manga_id = ?';
    var sql = 'select c.id, c.creator_name from artists a join creators c on a.creator_id = c.id where a.manga_id = ?;';
    var inserts = [manga_id];

    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.addArtist = function(manga_id, creator_id) {
  return new Promise((resolve, reject) => {
    var sql = 'INSERT IGNORE INTO artists (manga_id, creator_id) values (?, ?);';

    sql = mysql.format(sql, [manga_id, creator_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};

exports.deleteArtist = function(manga_id, creator_id) {
  return new Promise((resolve, reject) => {
    var sql = 'DELETE IGNORE from artists where manga_id = ? AND creator_id = ?;';

    sql = mysql.format(sql, [manga_id, creator_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};



// Authors

exports.getAuthorById = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select * from creators where id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.getAuthorsByMangaId = function(manga_id) {
  return new Promise((resolve, reject) => {
    //var sql = 'select a.creator_id, c.creator_name as author_name from authors a join creators c on a.creator_id = c.id where manga_id = ?';
    var sql = 'select c.id, c.creator_name from authors a join creators c on a.creator_id = c.id where a.manga_id = ?;';
    var inserts = [manga_id];

    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.addAuthor = function(manga_id, creator_id) {
  return new Promise((resolve, reject) => {
    var sql = 'INSERT IGNORE INTO authors (manga_id, creator_id) values (?, ?);';

    sql = mysql.format(sql, [manga_id, creator_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};

exports.deleteAuthor = function(manga_id, creator_id) {
  return new Promise((resolve, reject) => {
    var sql = 'DELETE IGNORE from authors where manga_id = ? AND creator_id = ?;';

    sql = mysql.format(sql, [manga_id, creator_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};


//Types

exports.getTypeByMangaId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select t.id, t.type from mangas m join types t on m.type = t.id where m.id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

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

exports.getStatusByMangaId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select s.id, s.status from mangas m join status s on m.status = s.id where m.id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

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
    var sql = 'select id, genre from mangas_genres mg join genres g on mg.genre_id = g.id where mg.manga_id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

exports.addGenre = function(manga_id, genre_id) {
  return new Promise((resolve, reject) => {
    var sql = 'INSERT IGNORE INTO mangas_genres (manga_id, genre_id) values (?, ?);';

    sql = mysql.format(sql, [manga_id, genre_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};

exports.deleteGenre = function(manga_id, genre_id) {
  return new Promise((resolve, reject) => {
    var sql = 'DELETE IGNORE from mangas_genres where manga_id = ? AND genre_id = ?;';

    sql = mysql.format(sql, [manga_id, genre_id]);

    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      resolve(results);
    });
  });
};

exports.searchGenresByGenre = function(genre) {
  return new Promise((resolve, reject) => {
    var sql = (`
      select * from genres
        where genre LIKE ?
        ORDER BY CASE
          WHEN genre LIKE ? THEN 0
          WHEN genre LIKE ? THEN 1
          ELSE 2
        END
        limit 5;
      `);

      sql = mysql.format(sql, ['%' + genre + '%', genre + '%', '%' + genre]);

    connection.query(sql, genre, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Users
// or
// Members
exports.getUsersByGroupId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select username as id from members where group_id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};



// Manga count
exports.getMangaCountByGroupId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = `select count(*) as manga_count from (select m.* from mangas m
    left join chapters c on m.id = c.manga_id
    left join chapters_groups cg on c.id = cg.chapter_id
    left join groups g on cg.group_id = g.id
    where g.id = ? group by m.id) as mangas;`;

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

exports.getChapterCountByGroupId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = `select count(*) as chapter_count from chapters c
    left join chapters_groups cg on c.id = cg.chapter_id
    left join groups g on cg.group_id = g.id where g.id = ?;`;

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};


// Member count
exports.getMemberCountByGroupId = function(id) {
  return new Promise((resolve, reject) => {
    var sql = 'select count(*) as member_count from members where group_id = ?;';

    connection.query(sql, id, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

// Permission

exports.getPermissionByGroupIdAndUsername = function(group_id, username) {
  return new Promise((resolve, reject) => {
    var sql = `select p.permission_initial, p.permission_value from members m
      join permissions p on p.permission_initial = m.permission
      where group_id = ? && username = ? limit 1;`;

    sql = mysql.format(sql, [group_id, username]);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);

      resolve(results);
    });
  });
};

// Manga mutations
exports.updateManga = function(id, manga_title, descript, status, type) {
  return new Promise((resolve, reject) => {
    var sql = (`UPDATE mangas SET manga_title = ?, descript = ?,
      status = ?, type = ?, edited = UTC_TIMESTAMP() where id = ?;`);

    sql = mysql.format(sql, [manga_title, descript, status, type, id]);

    connection.query(sql, function(err, results) {
      if (err) console.log(err);
      resolve(results);
    });
  });
};



/*
// Add sql to the list variables
for (var i = 0; i < authors.length; i++) {
authorsSql = authorsSql + 'INSERT IGNORE INTO authors (manga_id, creator_id) values (?, ?);'
authorsSql = mysql.format(authorsSql, [id, authors[i].creator_id]);
}
for (var i = 0; i < artists.length; i++) {
artistsSql = artistsSql + 'INSERT IGNORE INTO artists (manga_id, creator_id) values (?, ?);'
artistsSql = mysql.format(artistsSql, [id, artists[i].creator_id]);
}
for (var i = 0; i < genres.length; i++) {
genresSql = genresSql + 'INSERT IGNORE INTO genres (manga_id, genre) values (?, ?);'
genresSql = mysql.format(genresSql, [id, genres[i].genre]);
}
// To remove a group, you need to remove all the chapters from the group.
for (var i = 0; i < groups.length; i++) {
groupsSql = groupsSql + 'INSERT INTO chapter_scanlated_by (chapter_id, group_id) values (?, ?);'
groupsSql = mysql.format(groupsSql, [id, groups[i]]);
}*/


//sql = sql + authorsSql + artistsSql + genresSql;

exports.test = () => {
  return new Promise((resolve, reject) => {
    var sql = 'select id from mangas where id = 2;';
    connection.query(sql, (err, results) => {
      if (err) console.log(err);
      console.log('0');
      resolve(results);
    });
  }).then((value) => {
    return new Promise((resolve, reject) => {
      connection.query('select * from genres where manga_id = ?;', value[0].id, (err, results) => {
        console.log('1');
        if (err) console.log(err);
        resolve(results);
      });
    });
  });
};
