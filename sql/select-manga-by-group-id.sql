select m.*
  from mangas m
  left join chapters c on m.id = c.manga_id
  left join chapter_scanlated_by csb on c.id = csb.chapter_id
  left join groups g on csb.group_id = g.id
  where g.id = 3 group by m.id;
