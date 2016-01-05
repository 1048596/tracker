-- MySQL dump 10.13  Distrib 5.6.26, for osx10.10 (x86_64)
--
-- Host: localhost    Database: tracker
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `manga_id` int(10) unsigned NOT NULL,
  `creator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`manga_id`,`creator_id`),
  KEY `manga_id` (`manga_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artists_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `creators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (2,1);
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `manga_id` int(10) unsigned NOT NULL,
  `creator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`manga_id`,`creator_id`),
  KEY `manga_id` (`manga_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `authors_ibfk_1` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `authors_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `creators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (2,1);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Thus Spoke Zarathustra'),(2,'The Great Gatsby'),(3,'1984'),(4,'asdf'),(5,'Beyond Good and Evil'),(6,'Testing'),(7,'Testing 2'),(8,'Testing 3'),(9,'Testing 4'),(10,'Testing 5'),(11,'Testing 6'),(12,'Testing 7'),(13,'Testing 8'),(14,'Testing 9'),(15,'Testing 10'),(16,'Testing 11'),(17,'Testing 12'),(18,'Testing 13'),(19,'Testing 14'),(20,'Testing 15'),(21,'Testing 16'),(22,'Testing 17'),(23,'Testing 18'),(24,'Testing 19'),(25,'random book'),(26,'random book 2'),(27,'random book 3'),(28,'random book 4'),(29,'random book 5'),(30,'random book 6'),(31,'random book 7'),(32,'random book 8'),(33,'random book 9'),(34,'random book 10'),(35,'random book 10'),(36,'random book 10'),(37,'random book 11'),(38,'random book 12'),(39,'random book 12'),(40,'random book 12'),(41,'random book 13'),(42,'random book 14'),(43,'random book 15'),(44,'random book 16'),(45,'random book 16'),(46,'random book 16'),(47,'random book 17'),(48,'random book 18'),(49,'random book 19'),(50,'random book 20'),(51,'random book 21'),(52,'random book 22'),(53,'random book 23'),(54,'random book 24');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter_scanlated_by`
--

DROP TABLE IF EXISTS `chapter_scanlated_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter_scanlated_by` (
  `chapter_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`chapter_id`,`group_id`),
  KEY `group_id` (`group_id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `chapter_scanlated_by_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chapter_scanlated_by_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter_scanlated_by`
--

LOCK TABLES `chapter_scanlated_by` WRITE;
/*!40000 ALTER TABLE `chapter_scanlated_by` DISABLE KEYS */;
INSERT INTO `chapter_scanlated_by` VALUES (1,1),(2,1),(3,1),(7,2),(8,2),(9,2),(9,3);
/*!40000 ALTER TABLE `chapter_scanlated_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chapter_title` varchar(140) DEFAULT NULL,
  `chapter_number` double(8,2) NOT NULL,
  `manga_id` int(10) unsigned NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,'One Shot - Joker',0.00,1,'2015-10-29 11:28:12'),(2,'Tradegy',1.00,1,'2015-10-29 11:28:12'),(3,'Strange Phenomenon',2.00,1,'2015-10-29 11:28:12'),(4,'Canvas 01',1.00,2,'2015-10-29 11:28:12'),(5,'Canvas 02',2.00,2,'2015-10-29 11:28:12'),(6,'Canvas 03',3.00,2,'2015-10-29 11:28:12'),(7,NULL,0.00,3,'2015-10-29 11:28:12'),(8,NULL,1.00,3,'2015-10-29 11:28:12'),(9,NULL,2.00,3,'2015-10-29 11:28:12'),(20,'Canvas 04',4.00,2,'2015-12-11 23:13:36'),(22,'Canvas 05',5.00,2,'2015-12-11 23:38:29'),(23,'Canvas 06',6.00,2,'2015-12-11 23:40:56'),(24,'Canvas 07',7.00,2,'2015-12-14 15:33:54'),(25,'Canvas 08',7.00,2,'2015-12-14 15:35:04'),(26,'Canvas 09',9.00,2,'2015-12-14 15:40:05'),(27,'Canvas 10',10.00,2,'2015-12-14 15:42:17'),(28,'Canvas 11',11.00,2,'2015-12-14 15:46:29'),(29,'Canvas 12',12.00,2,'2015-12-14 16:47:35'),(30,'Canvas 13',13.00,2,'2015-12-14 16:53:29'),(31,'Canvas 14',14.00,2,'2015-12-14 16:59:26'),(32,'Canvas 15',15.00,2,'2015-12-14 17:14:28'),(33,'Canvas 16',16.00,2,'2015-12-14 17:26:43'),(34,'Canvas 17',17.00,2,'2015-12-14 20:19:28'),(35,'Canvas 18',18.00,2,'2015-12-14 20:26:35'),(36,'Canvas 19',19.00,2,'2015-12-14 20:30:10'),(37,'Canvas 20',20.00,2,'2015-12-14 20:31:43'),(38,'Canvas 21',21.00,2,'2015-12-14 20:48:12'),(39,'Canvas 22',22.00,2,'2015-12-14 20:51:09'),(40,'Canvas 23',23.00,2,'2015-12-14 20:52:53'),(41,'Canvas 24',24.00,2,'2015-12-15 11:17:18'),(42,'Canvas 25',25.00,2,'2015-12-15 11:37:00'),(43,'Canvas 26',26.00,2,'2015-12-15 11:49:45'),(44,'Canvas 27',27.00,2,'2015-12-15 11:53:01'),(45,'Canvas 28',28.00,2,'2015-12-15 12:08:32'),(46,'Canvas 29',29.00,2,'2015-12-15 12:15:49'),(47,'Canvas 30',30.00,2,'2015-12-15 12:26:44'),(48,'Canvas 31',31.00,2,'2015-12-15 12:29:10'),(49,'Canvas 32',32.00,2,'2015-12-15 13:50:17'),(50,'Canvas 33',33.00,2,'2015-12-15 13:53:19'),(51,'Canvas 34',34.00,2,'2015-12-15 13:54:03'),(52,'Canvas 35',35.00,2,'2015-12-15 13:55:53'),(53,'Canvas 36',36.00,2,'2015-12-15 14:02:34'),(54,'Canvas 37',37.00,2,'2015-12-15 14:03:13'),(55,'Canvas 38',38.00,2,'2015-12-15 14:09:15'),(56,'Canvas 39',39.00,2,'2015-12-15 14:12:03'),(57,'Canvas 40',40.00,2,'2015-12-15 14:14:06'),(58,'Canvas 41',41.00,2,'2015-12-15 14:14:48'),(59,'Canvas 42',42.00,2,'2015-12-15 15:27:16'),(60,'Canvas 43',43.00,2,'2015-12-15 15:32:12'),(61,'Canvas 44',44.00,2,'2015-12-15 15:33:57'),(62,'Canvas 45',45.00,2,'2015-12-15 15:34:51'),(63,'Canvas 46',46.00,2,'2015-12-16 09:58:22'),(64,'Canvas 47',47.00,2,'2015-12-16 13:21:04'),(65,'Canvas 48',48.00,2,'2015-12-16 13:23:11'),(66,'Canvas 49',49.00,2,'2015-12-20 19:01:34'),(67,'Canvas 50',50.00,2,'2015-12-25 22:44:51');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creators`
--

DROP TABLE IF EXISTS `creators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `creator_name` varchar(70) NOT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `descript` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creators`
--

LOCK TABLES `creators` WRITE;
/*!40000 ALTER TABLE `creators` DISABLE KEYS */;
INSERT INTO `creators` VALUES (1,'Akiko Higashimura','f','1975-10-15','Author and artist for Kakukaku Shikajika and Jellyfish Princess');
/*!40000 ALTER TABLE `creators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `manga_id` int(10) unsigned NOT NULL,
  `genre` varchar(70) NOT NULL,
  PRIMARY KEY (`manga_id`,`genre`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `genres_ibfk_1` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action'),(1,'Mystery'),(1,'Psychological'),(2,'Comedy'),(2,'Slice of Life'),(3,'Comedy'),(3,'Romance'),(3,'School Life');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(70) NOT NULL,
  `descript` mediumtext,
  `created` datetime NOT NULL,
  `edited` datetime DEFAULT NULL,
  `owner` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Twisted Hel Scans','Translates Tokyo Ghoul and was in a bit of a drama around translations.','2015-10-29 11:28:12',NULL,'asdf'),(2,'Game of Scanlation','Scanlation group created by Allafta.','2015-10-29 11:28:12',NULL,'tonton'),(3,'Testing Group','This is just a test for groups.','2015-12-21 12:25:44',NULL,'asdf');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mangas`
--

DROP TABLE IF EXISTS `mangas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mangas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `manga_title` varchar(70) NOT NULL,
  `descript` mediumtext,
  `created` datetime NOT NULL,
  `edited` datetime DEFAULT NULL,
  `type` smallint(5) unsigned NOT NULL DEFAULT '0',
  `status` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `status` (`status`),
  CONSTRAINT `mangas_ibfk_1` FOREIGN KEY (`type`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mangas_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mangas`
--

LOCK TABLES `mangas` WRITE;
/*!40000 ALTER TABLE `mangas` DISABLE KEYS */;
INSERT INTO `mangas` VALUES (1,'Tokyo Ghoul','About a human called Kaneki, which later on becomes a ghoul.','2015-10-29 11:28:12',NULL,0,0),(2,'Kakukaku Shikajika','Self-biography of Akiko Higashimura.','2015-10-29 11:28:12',NULL,1,2),(3,'Skill of Lure','About a guy learning about how to pick up girls.','2015-10-29 11:28:12',NULL,0,0);
/*!40000 ALTER TABLE `mangas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `username` varchar(20) NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  `permission` varchar(1) NOT NULL DEFAULT 'f',
  PRIMARY KEY (`username`,`group_id`),
  KEY `username` (`username`),
  KEY `group_id` (`group_id`),
  KEY `permission` (`permission`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_ibfk_3` FOREIGN KEY (`permission`) REFERENCES `permissions` (`permission_initial`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('asdf',1,'a');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `permission_initial` varchar(1) NOT NULL,
  `permission_value` varchar(70) NOT NULL,
  PRIMARY KEY (`permission_initial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('a','Admin'),('b','Member'),('d','Donator'),('f','Follower'),('m','Mod');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `status` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (0,'null'),(1,'On going'),(2,'Completed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subs`
--

DROP TABLE IF EXISTS `subs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subs` (
  `username` varchar(20) NOT NULL,
  `manga_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`username`,`manga_id`),
  KEY `username` (`username`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `subs_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subs_ibfk_2` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subs`
--

LOCK TABLES `subs` WRITE;
/*!40000 ALTER TABLE `subs` DISABLE KEYS */;
INSERT INTO `subs` VALUES ('asdf',1),('asdf',2);
/*!40000 ALTER TABLE `subs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `type` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (0,'null'),(1,'Manga'),(2,'Manhwa');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('adsf1','$2a$10$w/lXFEbX8CAegTw3JkTe4uehky26ZWqtyYQbUWnWUAqQQwqxkaBS2'),('asdf','$2a$10$uP.OUnvBYVImzDAMOojqKuO2lxObGFyMsz5eBe55hn5CVrFanaIwq'),('test','$2a$10$8rUpBQ4qHYyfZViVCggU.OugTt9LlFcJeYzmD9jYvhFr4LBp5Cspe'),('testing','$2a$10$40OHLPapIK9nit/Cl/EF2OOEut9tnentRZd0gWn5GHTf6MJIv.Rou'),('tonton','$2a$10$.v3YOlvzX1eZzEZLg5N0r.WuKemwBSYa3x1OqE3XIVsCNY5r6ZfgK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-06  0:21:34
