SELECT id, chapter_title FROM chapters
WHERE chapter_title LIKE '%s%'
ORDER BY CASE WHEN chapter_title LIKE 's%' THEN 0
              WHEN chapter_title LIKE '%s' THEN 1
              ELSE 2
         END, id
         limit 20;
