insert into mangas (manga_title, descript, created) values ('Tokyo Ghoul', 'About a human called Kaneki, which later on becomes a ghoul.', now());
insert into mangas (manga_title, descript, created) values ('Kakukaku Shikajika', 'Self-biography of Akiko Higashimura.', now());
insert into mangas (manga_title, descript, created) values ('Skill of Lure', 'About a guy learning about how to pick up girls.', now());

insert into chapters (chapter_title, chapter_number, manga_id, created) values ('One Shot - Joker', 0, 1, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values ('Tradegy', 1, 1, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values ('Strange Phenomenon', 2, 1, now());

insert into chapters (chapter_title, chapter_number, manga_id, created) values ('Canvas 01', 1, 2, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values ('Canvas 02', 2, 2, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values ('Canvas 03', 3, 2, now());

insert into chapters (chapter_title, chapter_number, manga_id, created) values (null, 0, 3, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values (null, 1, 3, now());
insert into chapters (chapter_title, chapter_number, manga_id, created) values (null, 2, 3, now());


insert into genres (manga_id, genre) values (2, 'Slice of Life');
insert into genres (manga_id, genre) values (2, 'Comedy');

insert into genres (manga_id, genre) values (3, 'Romance');
insert into genres (manga_id, genre) values (3, 'School Life');
insert into genres (manga_id, genre) values (3, 'Comedy');

insert into genres (manga_id, genre) values (1, 'Action');
insert into genres (manga_id, genre) values (1, 'Psychological');
insert into genres (manga_id, genre) values (1, 'Mystery');


insert into groups (group_name, descript, created) values ('Twisted Hel Scans', 'Translates Tokyo Ghoul and was in a bit of a drama around translations.', now());
insert into groups (group_name, descript, created) values ('Game of Scanlation', 'Scanlation group created by Allafta.', now());

insert into chapter_scanlated_by (chapter_id, group_id) values (1, 1);
insert into chapter_scanlated_by (chapter_id, group_id) values (2, 1);
insert into chapter_scanlated_by (chapter_id, group_id) values (3, 1);

insert into chapter_scanlated_by (chapter_id, group_id) values (7, 2);
insert into chapter_scanlated_by (chapter_id, group_id) values (8, 2);
insert into chapter_scanlated_by (chapter_id, group_id) values (9, 2);
