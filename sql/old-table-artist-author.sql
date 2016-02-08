create table authors (
  id int unsigned not null auto_increment,
  manga_id int unsigned not null,
  author_name varchar(70) not null,
  primary key(id),
  index (manga_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade
) engine=innodb;

create table artists (
  id int unsigned not null auto_increment,
  manga_id int unsigned not null,
  artist_name varchar(70) not null,
  primary key(id),
  index (manga_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade
) engine=innodb;

create table manga_and_author (
  manga_id int unsigned not null,
  author_id int unsigned not null,
  primary key(manga_id, author_id),
  index (manga_id),
  index (author_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade,
  foreign key (author_id)
  references authors(id)
    on update cascade
    on delete cascade
) engine=innodb;

create table manga_and_artist (
  manga_id int unsigned not null,
  artist_id int unsigned not null,
  primary key(manga_id, artist_id),
  index (manga_id),
  index (artist_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade,
  foreign key (artist_id)
  references artists(id)
    on update cascade
    on delete cascade
) engine=innodb;
