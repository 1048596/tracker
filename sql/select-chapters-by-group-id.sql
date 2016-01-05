select c.*
  from chapters c
  left join chapter_scanlated_by csb on c.id = csb.chapter_id
  left join groups g on csb.group_id = g.id
  where g.id = 2 group by c.id desc limit 3 offset 0;
