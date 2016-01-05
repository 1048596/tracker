insert into chapters (chapter_title, chapter_number, manga_id, created)
  select 'Canvas 04', 4, m.id, now()
  from mangas m where m.manga_title = 'Kakukaku Shikajika';
