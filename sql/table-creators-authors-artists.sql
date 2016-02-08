create table creators (
  id int unsigned not null auto_increment,
  creator_name varchar(70) not null,
  gender varchar(1),
  birthday date,
  descript mediumtext,
  primary key (id)
) engine=innodb;

create table artists (
  manga_id int unsigned not null,
  creator_id int unsigned not null,
  primary key(manga_id, creator_id),
  index(manga_id),
  index(creator_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade,
  foreign key (creator_id)
  references creators(id)
    on update cascade
    on delete cascade
) engine=innodb;

create table authors (
  manga_id int unsigned not null,
  creator_id int unsigned not null,
  primary key(manga_id, creator_id),
  index(manga_id),
  index(creator_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade,
  foreign key (creator_id)
  references creators(id)
    on update cascade
    on delete cascade
) engine=innodb;
