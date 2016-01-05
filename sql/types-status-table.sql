create table types (
  id smallint unsigned default 0 not null,
  type varchar(70) not null,
  primary key(id)
) engine=innodb;

create table status (
  id smallint unsigned default 0 not null,
  status varchar(70) not null,
  primary key(id)
) engine=innodb;
