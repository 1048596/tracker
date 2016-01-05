select g.*
  from groups g
  left join chapter_scanlated_by csb on g.id = csb.group_id
  left join chapters c on csb.chapter_id = c.id
  left join mangas m on c.manga_id = m.id
  where m.id = 3 group by g.id;
