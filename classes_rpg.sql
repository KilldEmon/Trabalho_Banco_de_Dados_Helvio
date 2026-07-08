-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: classes_rpg
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id_classe` int NOT NULL AUTO_INCREMENT,
  `nome_classe` varchar(50) NOT NULL,
  `tipo_dano` varchar(50) NOT NULL,
  `multiplicador_vida` decimal(4,2) NOT NULL,
  `data_criacao` date NOT NULL,
  PRIMARY KEY (`id_classe`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Mago','Mágico',1.20,'2026-01-10'),(2,'Guerreiro','Físico',2.50,'2026-01-12'),(3,'Arqueiro','Físico',1.50,'2026-01-15'),(4,'Tank','Físico',3.00,'2026-02-20'),(5,'Necromancer','Mágico',1.10,'2026-03-05');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamentos` (
  `id_equipamento` int NOT NULL AUTO_INCREMENT,
  `nome_equipamento` varchar(100) NOT NULL,
  `poder_ataque` int NOT NULL,
  `data_forja` date NOT NULL,
  `id_heroi_fk` int DEFAULT NULL,
  PRIMARY KEY (`id_equipamento`),
  KEY `fk_equipamento_heroi` (`id_heroi_fk`),
  CONSTRAINT `fk_equipamento_heroi` FOREIGN KEY (`id_heroi_fk`) REFERENCES `herois` (`id_heroi`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
INSERT INTO `equipamentos` VALUES (1,'Cajado',150,'2026-07-06',1),(2,'Livro de Magias',80,'2026-07-06',3),(3,'Espada Longa',200,'2026-07-06',2),(4,'Arco Élfico',180,'2026-07-06',4),(5,'Escudo',50,'2026-07-06',5);
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `herois`
--

DROP TABLE IF EXISTS `herois`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `herois` (
  `id_heroi` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nivel_atual` int NOT NULL,
  `data_desbloqueio` date NOT NULL,
  `id_classe_fk` int NOT NULL,
  PRIMARY KEY (`id_heroi`),
  KEY `fk_heroi_classe` (`id_classe_fk`),
  CONSTRAINT `fk_heroi_classe` FOREIGN KEY (`id_classe_fk`) REFERENCES `classes` (`id_classe`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herois`
--

LOCK TABLES `herois` WRITE;
/*!40000 ALTER TABLE `herois` DISABLE KEYS */;
INSERT INTO `herois` VALUES (1,'Gustavo',20,'2026-07-01',1),(2,'teste2',0,'2026-07-02',2),(3,'Ghabriel',20,'2026-07-03',1),(4,'Rubens',20,'2026-07-04',3),(5,'Giovani',20,'2026-07-05',4);
/*!40000 ALTER TABLE `herois` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'classes_rpg'
--

--
-- Dumping routines for database 'classes_rpg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-08  2:05:23
