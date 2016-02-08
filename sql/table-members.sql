create table members (
  username varchar(20) not null,
  group_id int unsigned not null,
  permission varchar(1) not null default "n",
  primary key (username, group_id),
  index (username),
  index (group_id),
  index (permission),
  foreign key (username)
  references users(username)
    on update cascade
    on delete cascade,
  foreign key (group_id)
  references groups(id)
    on update cascade
    on delete cascade,
  foreign key (permission)
  references permissions(permission_initial)
    on update cascade
    on delete cascade
) engine=innodb;

insert into members (username, group_id, permission) values ('asdf', 1, 'a');
