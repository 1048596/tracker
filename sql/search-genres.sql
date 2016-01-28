select * from genres
  where genre LIKE ?
  ORDER BY CASE
    WHEN genre LIKE ? THEN 0
    WHEN genre LIKE ? THEN 1
    ELSE 2
  END
  limit 5;
