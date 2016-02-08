create table profiles (
  name varchar(20) not null,
  biography varchar(160),
  email varchar(255),
  gender varchar(1),
  birthday date,
  location varchar(30),
  primary key (name),
  index (name),
  foreign key (name)
  references users(username)
    on update cascade
    on delete cascade
) ENGINE=InnoDB;
