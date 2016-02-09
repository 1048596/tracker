create table members (
  user_id int unsigned not null,
  group_id int unsigned not null,
  permission_id int(2) unsigned not null,
  primary key (user_id, group_id, permission_id),
  index (user_id),
  index (group_id),
  index (permission_id),
  foreign key (user_id)
  references users(id)
    on update cascade
    on delete cascade,
  foreign key (group_id)
  references groups(id)
    on update cascade
    on delete cascade,
  foreign key (permission_id)
  references permissions(id)
    on update cascade
    on delete cascade
) engine=innodb;

#insert into members (user_id, group_id, permission) values (2, 1, 'o');
