create table profiles (
  user_id int unsigned not null,
  biography varchar(160),
  email varchar(255),
  gender varchar(1),
  birthday date,
  location varchar(30),
  primary key (user_id),
  index (user_id),
  foreign key (user_id)
  references users(id)
    on update cascade
    on delete cascade
) ENGINE=InnoDB;
