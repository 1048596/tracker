create table mangas (
  id int unsigned not null auto_increment,
  manga_title varchar(70) not null,
  descript mediumtext,
  created datetime not null,
  edited datetime,
  primary key (id)
) ENGINE=INNODB;

create table chapters (
  id int unsigned not null auto_increment,
  chapter_title varchar(140),
  chapter_number double(8, 2) not null,
  manga_id int unsigned not null,
  created datetime not null,
  primary key (id),
  index(manga_id),
  foreign key (manga_id)
  references mangas(id)
    on delete cascade
    on update cascade
) ENGINE=INNODB;
