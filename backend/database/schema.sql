-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 22 juin 2026 à 10:38
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `uneed`
--

-- --------------------------------------------------------

--
-- Structure de la table `ads`
--

DROP TABLE IF EXISTS `ads`;
CREATE TABLE IF NOT EXISTS `ads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_1` varchar(500) DEFAULT '/public/images/default_image.svg',
  `image_2` varchar(500) DEFAULT '/public/images/default_image.svg',
  `image_3` varchar(500) DEFAULT '/public/images/default_image.svg',
  `id_category` int DEFAULT NULL,
  `points` int NOT NULL,
  `status` enum('signalé','en cours','terminé','disponible') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'disponible',
  `zip_code` int NOT NULL,
  `city` varchar(500) NOT NULL,
  `urgent` tinyint(1) NOT NULL DEFAULT '0',
  `id_user` int DEFAULT NULL,
  `date_execution` date DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`id_category`),
  KEY `fk_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ads`
--

INSERT INTO `ads` (`id`, `title`, `description`, `image_1`, `image_2`, `image_3`, `id_category`, `points`, `status`, `zip_code`, `city`, `urgent`, `id_user`, `date_execution`, `date_creation`) VALUES
(1, 'Besoin pour arroser mes plantes', 'Ayant eu un accident me bloquant le dos, je ne peux plus arroser mes plantes. Je cherche une personne qui pourra venir arroser mes plantes.', '/public/images/default_image.svg', '/public/images/default_image.svg', '/public/images/default_image.svg', 9, 2, 'disponible', 13010, 'Marseille', 0, 1, '2026-04-29', '2026-05-05 14:16:25'),
(2, 'Besoin d’aide pour faire mes courses', 'Suite à une entorse à la cheville, je ne peux pas me déplacer facilement. Je cherche une personne pour m’aider à faire quelques courses au supermarché du quartier.', '/public/images/default_image.svg', '/public/images/default_image.svg', '/public/images/default_image.svg', 9, 3, 'disponible', 13010, 'Marseille', 0, 1, '2026-05-02', '2026-05-05 14:16:25'),
(3, 'Aide pour réparation ordi', 'aidez moi', '/uploads/1780654524819-young-couple-new-apartment-with-small-dog.jpg', NULL, NULL, 5, 1, 'disponible', 13002, 'Marseille', 1, 10, NULL, '2026-06-05 10:15:25'),
(5, 'Recherche garde chats', 'J\'ai besoin d\'aide pour garder mes chiens pendant les vacances', '/uploads/1781688374639-pexels-horacio-lander-1239977167-35578134.jpg', NULL, NULL, 8, 1, 'en cours', 13002, 'Marseille', 0, 12, NULL, '2026-06-17 09:26:14'),
(6, 'Recherche connaisseur plantes', 'J\'a besoin d\'aide pour entretenir mes plantes qui tirent la tête', NULL, NULL, NULL, 9, 2, 'terminé', 75006, 'Paris', 0, 12, NULL, '2026-06-17 09:56:05'),
(7, 'Recherche un réparateur de téléphone', 'Téléphone vintage pour réparer', NULL, NULL, NULL, 12, 3, 'en cours', 75006, 'Paris', 0, 12, NULL, '2026-06-17 19:39:31'),
(8, 'Recherche personne pour ménage', 'Acquisition nouvel appart', '/uploads/1781725305217-closeup-man-carrying-cardboard-boxes-while-relocating-into-new-apartment.jpg', '/uploads/1781725305364-carboard-boxes-potted-plant-new-apartment.jpg', NULL, 3, 4, 'terminé', 75006, 'Paris', 1, 12, NULL, '2026-06-17 19:41:45'),
(9, 'Recherche ramasseur de pommes', 'Possède de nombreux pommiers', '/uploads/1781775067239-arc6.png', '/uploads/1781775067240-Brutalism style poster.jpg', NULL, 9, 2, 'terminé', 75016, 'Paris', 1, 12, NULL, '2026-06-18 09:31:07');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Déménagement'),
(2, 'Bricolage'),
(3, 'Aide ménagère'),
(4, 'Aide aux séniors'),
(5, 'Informatique'),
(6, 'Petit travaux'),
(7, 'Course'),
(8, 'Animaux'),
(9, 'Jardinerie'),
(10, 'Transport'),
(11, 'Aide scolaire'),
(12, 'Autre');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_sender` int NOT NULL,
  `id_receiver` int NOT NULL,
  `id_request` int NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `content`, `created_at`, `id_sender`, `id_receiver`, `id_request`, `is_read`) VALUES
(1, 'Bonjour, je serais ravis de vous aider.', '2026-05-05 14:16:25', 2, 1, 1, 0),
(2, 'Super, vous êtes disponible quand ?', '2026-05-05 14:16:25', 1, 2, 1, 0),
(11, 'in', '2026-06-19 21:33:57', 13, 12, 9, 0),
(12, 'ok', '2026-06-19 21:34:52', 12, 13, 9, 0),
(13, 'in', '2026-06-19 22:06:36', 13, 12, 11, 0),
(14, 'ok', '2026-06-19 22:07:14', 12, 13, 11, 0),
(20, 'je suis opée', '2026-06-22 08:45:03', 13, 12, 16, 0),
(21, 'trop bien', '2026-06-22 08:45:36', 12, 13, 16, 0),
(22, 'op', '2026-06-22 10:35:05', 13, 12, 17, 0);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `has_been_read` tinyint(1) DEFAULT '0',
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userNotif` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `requests`
--

DROP TABLE IF EXISTS `requests`;
CREATE TABLE IF NOT EXISTS `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_ad` int NOT NULL,
  `id_helper` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `status` enum('signalé','en cours','terminé','refusé','disponible') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'disponible',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_adRequest` (`id_ad`),
  KEY `fk_helper` (`id_helper`),
  KEY `fk_needer` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `requests`
--

INSERT INTO `requests` (`id`, `id_ad`, `id_helper`, `id_user`, `status`, `date_creation`) VALUES
(1, 1, 2, 1, 'en cours', '2026-05-05 14:16:25'),
(16, 6, 13, 12, 'terminé', '2026-06-22 08:44:55'),
(17, 7, 13, 12, 'disponible', '2026-06-22 09:55:19');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `role` enum('admin','user','moderateur') DEFAULT 'user',
  `points` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `zip_code`, `city`, `role`, `points`, `created_at`, `updated_at`) VALUES
(1, 'Paul', 'LeDu', 'PaulleDu@gmail.com', '123456', '0654322343', '13010', 'Marseille', 'user', 0, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(2, 'Roxane', 'Sarpi', 'RoxaneSarpi@gmail.com', '123456', '0743453224', '13015', 'Marseille', 'admin', 0, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(3, 'Vero', 'Lastar', 'Verolastar@gmail.com', '123456', '0432345432', '13005', 'Marseille', 'user', 0, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(4, 'Akio', 'Kimura', 'Akio@gmail.com', '123456', '0654322343', '130011', 'Marseille', 'moderateur', 0, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(5, 'Karen', 'C', 'test@test.com', '$argon2id$v=19$m=65536,t=5,p=1$DA+Pwpx3XG6cXTLd6k6d6g$U75JGS5bkkx4YtPSrpErCOkhY8W/uSRPjUfNEyMVvQA', '0786456789', '13009', 'Marseille', 'user', 30, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(7, 'Karen', 'Karen Castillo', 'karen.castillo@laplateforme.io', '$argon2id$v=19$m=65536,t=5,p=1$SfDI1UDjcJX6zGqlSTwHeA$10l3mD/pePb7H/BrJYFWL8gevkefr3Zg4C9ssxiqloM', '+33621296253', '13004', 'Marseille', 'user', 10, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(8, 'Karen', 'test', 'test@example.com', '$argon2id$v=19$m=65536,t=5,p=1$5iKfVmGncqAZ+ZXfIzOnzg$7LQjNLThrLhDf9C8jxJRGhIdKUj/6jy9lulxSZPOlsA', '0786456789', '13002', 'Marseille', 'user', 10, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(9, 'test', 'test', 'test@test.fr', '$argon2id$v=19$m=65536,t=5,p=1$i73/AQ/T4oDznDmWsCD+Sg$xK97vZxrPD/UKP2swUbASGTYbrCoOUEDBnThJ0u6elY', '0786456789', '13004', 'Marseille', 'admin', 10, '2026-06-04 14:20:24', '2026-06-04 14:20:24'),
(10, 'LeK', 'C', 'kc@kc.com', '$argon2id$v=19$m=65536,t=5,p=1$r+HtOV2cl4vFbJUdDmHN0A$q4jbThDpF2YA4QCRg8iYSl3yO0buTjbgcLlAXQZoYaw', '0956342178', '13006', 'Paris', 'user', 10, '2026-06-05 08:36:08', '2026-06-05 08:36:08'),
(11, 'Marina', 'Serrano', 'marina@test.com', '$argon2id$v=19$m=65536,t=5,p=1$sPxcdb7uf3h4du69PGG2Ng$Z+IZjNiYKcli/w505K1phyXXkBl0L29BOPFcE1CwMgI', '0786456789', '13002', 'Marseille', 'admin', 10, '2026-06-15 12:06:30', '2026-06-15 12:24:48'),
(12, 'Vincent', 'LeTigre', 'vince@test.com', '$argon2id$v=19$m=65536,t=5,p=1$IxxotevAc4uYVTYPVa5wpw$UKIpiW5UwC6hV7kHHJfLXxIuIXizLzBCCRQfGZS41M8', '0786456789', '13006', 'Paris', 'user', 0, '2026-06-17 09:25:07', '2026-06-22 08:46:11'),
(13, 'Celine', 'Fury', 'celine@test.com', '$argon2id$v=19$m=65536,t=5,p=1$PsxNF+LDVQ+Na643P1RX6w$fNm6OVDqTk7FNWz7tpo7r+gInY4E2VA1AWJ5czVI94s', '0956342178', '75008', 'Paris', 'user', 20, '2026-06-19 12:13:40', '2026-06-22 08:46:11');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_userNotif` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `fk_adRequest` FOREIGN KEY (`id_ad`) REFERENCES `ads` (`id`),
  ADD CONSTRAINT `fk_helper` FOREIGN KEY (`id_helper`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_needer` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
