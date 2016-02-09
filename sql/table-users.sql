create table users (
  id int unsigned auto_increment not null,
  username varchar(20) not null unique,
  password char(60) not null,
  primary key (id)
) engine=innodb;
