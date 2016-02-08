create table groups (
  id int unsigned auto_increment not null,
  group_name varchar(70) not null,
  descript mediumtext,
  created datetime not null,
  edited datetime default null,
  primary key (id),
) engine=innodb;

# Remove the owner column as we save the owner in members instead.
