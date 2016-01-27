create table genres (
  id int unsigned auto_increment not null,
  genre varchar(70) not null,
  primary key(id, genre)
) engine=innodb;

create table manga_genres (
  manga_id int unsigned not null,
  genre_id int unsigned not null,
  primary key (manga_id, genre_id),
  index (manga_id),
  index (genre_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade,
  foreign key (genre_id)
  references genres(id)
    on update cascade
    on delete cascade
) engine=innodb;
