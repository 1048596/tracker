select g.*
  from groups g
  left join chapter_scanlated_by csb on g.id = csb.group_id
  left join chapters c on csb.chapter_id = c.id
  where c.id = 8 group by g.id;
