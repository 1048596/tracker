select c.*, m.manga_title, group_concat(distinct g.group_name separator ', ') as groups
  from chapters c
  left join mangas m on c.manga_id = m.id
  left join chapter_scanlated_by csb on c.id = csb.chapter_id
  left join groups g on csb.group_id = g.id
  group by c.id desc;


#finally
