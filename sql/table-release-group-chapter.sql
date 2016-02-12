CREATE TABLE `release_group_chapter` (
  `chapter_id` int(10) unsigned NOT NULL,
  `release_group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`chapter_id`,`release_group_id`),
  KEY `release_group_id` (`release_group_id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `release_group_chapter_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `release_group_chapter_ibfk_2` FOREIGN KEY (`release_group_id`) REFERENCES `release_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `release_group_chapter` VALUES (1,1),(2,1),(3,1),(7,2),(8,2),(9,2),(9,3),(65,3),(66,3),(67,3);
