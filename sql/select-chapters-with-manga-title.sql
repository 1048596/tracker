select c.*, m.manga_title from chapters c inner join mangas m on c.manga_id = m.id order by c.id desc;
