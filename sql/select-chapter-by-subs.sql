select m.manga_title, c.id, c.chapter_title
from subs s inner join
  mangas m
  on m.id = s.manga_id inner join
  chapters c
  on c.manga_id = m.id
  where s.username = 'asdf'
  group by c.id desc;
