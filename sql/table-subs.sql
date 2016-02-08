create table subs (
  username varchar(20) not null,
  manga_id int unsigned not null,
  primary key (username, manga_id),
  index(username),
  index(manga_id),
  foreign key (username)
  references users(username)
    on update cascade
    on delete cascade,
  foreign key (manga_id)
  references mangas(id)
    on update cascade
    on delete cascade
) engine=innodb;
