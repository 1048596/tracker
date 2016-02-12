create table subs (
  user_id int unsigned not null,
  manga_id int unsigned not null,
  primary key (user_id, manga_id),
  index(user_id),
  index(manga_id),
  foreign key (user_id)
  references user(id)
    on update cascade
    on delete cascade,
  foreign key (manga_id)
  references manga(id)
    on update cascade
    on delete cascade
) engine=innodb;
