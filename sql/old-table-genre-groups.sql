create table genres (
  manga_id int unsigned not null,
  genre varchar(70) not null,
  primary key (manga_id, genre),
  index (manga_id),
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade
) engine=innodb;

create table groups (
  id int unsigned not null auto_increment,
  group_name varchar(70) not null,
  descript mediumtext,
  created datetime not null,
  edited datetime,
  primary key (id)
) engine=innodb;

create table chapter_scanlated_by (
  chapter_id int unsigned not null,
  group_id int unsigned not null,
  primary key (chapter_id, group_id),
  index(group_id),
  index(chapter_id),
  foreign key (chapter_id)
  references chapters(id)
    on delete cascade
    on update cascade,
  foreign key (group_id)
  references groups(id)
    on delete cascade
    on update cascade
) engine=innodb;
