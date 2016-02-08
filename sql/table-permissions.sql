create table permissions (
  permission_initial varchar(1) not null,
  permission_value varchar(70) not null,
  primary key (permission_initial)
) engine=innodb;

insert into permissions (permission_initial, permission_value) values ('f', 'Follower');
