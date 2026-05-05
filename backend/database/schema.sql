CREATE DATABASE IF NOT EXISTS uneed;
USE uneed;

-- 1. On crée d'abord les tables "parentes"
CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Ajout de PRIMARY KEY
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Ajout de PRIMARY KEY
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Unique est mieux pour un email
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL, -- VARCHAR est mieux pour un téléphone (le 0 au début)
    zip_code VARCHAR(10), -- VARCHAR car NUMERIC peut poser souci avec les codes commençant par 0
    city VARCHAR(100) NOT NULL,
    role ENUM ('admin', 'user', 'moderateur') DEFAULT 'user',
    points INT DEFAULT 0
);

-- 2. On crée la table ads (qui dépend de categories et users)
CREATE TABLE IF NOT EXISTS ads (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL, -- TEXT est plus adapté qu'un VARCHAR(100) pour une description
  image_1 VARCHAR(500) DEFAULT '/public/images/default_image.svg',
  image_2 VARCHAR(500) DEFAULT '/public/images/default_image.svg',
  image_3 VARCHAR(500) DEFAULT '/public/images/default_image.svg',
  id_category INT,
  points INT NOT NULL,
  statut ENUM('signalé','en cours', 'terminé', 'disponible') DEFAULT 'disponible',
  zip_code INT NOT NULL,
  city VARCHAR(500) NOT NULL,
  urgent BOOLEAN NOT NULL DEFAULT FALSE,
  id_user INT,
  date_execution DATE, -- DATE suffit si on ne veut pas l'heure
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES categories(id),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id)
);

-- 3. Les autres tables
CREATE TABLE IF NOT EXISTS messages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    id_request INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS notifications(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(500) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    has_been_read BOOLEAN DEFAULT FALSE,
    id_user INT,
    CONSTRAINT fk_userNotif FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS requests(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ad INT NOT NULL,
    id_helper INT,
    id_user INT,
    status ENUM ('signalé','en cours','terminé') DEFAULT 'en cours',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_adRequest FOREIGN KEY (id_ad) REFERENCES ads(id),
    CONSTRAINT fk_helper FOREIGN KEY (id_helper) REFERENCES users(id),
    CONSTRAINT fk_needer FOREIGN KEY (id_user) REFERENCES users(id)
);

INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role)
VALUES ('Paul', 'LeDu', 'PaulleDu@gmail.com', '123456', '0654322343', '13010', 'Marseille', 'user');

INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role)
VALUES ('Roxane', 'Sarpi', 'RoxaneSarpi@gmail.com', '123456', '0743453224', '13015', 'Marseille', 'admin');

INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role)
VALUES ('Vero', 'Lastar', 'Verolastar@gmail.com', '123456', '0432345432', '13005', 'Marseille', 'user');

INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role)
VALUES ('Akio', 'Kimura', 'Akio@gmail.com', '123456', '0654322343', '130011', 'Marseille', 'moderateur');

INSERT INTO categories (name)
VALUES ('Déménagement'),
('Bricolage'),
('Aide ménagère'),
('Aide aux séniors'),
('Informatique'),
('Petit travaux'),
('Course'),
('Animaux'),
('Jardinerie'),
('Transport'),
('Aide scolaire'),
('Autre');

INSERT INTO ads (title, description, id_category, points, statut, zip_code, city, urgent, id_user, date_execution)
VALUES ('Besoin pour arroser mes plantes', 'Ayant eu un accident me bloquant le dos, je ne peux plus arroser mes plantes. Je cherche une personne qui pourra venir arroser mes plantes.', 9, 2, 'disponible', '13010', 'Marseille', false, 1, '2026-04-30');

INSERT INTO ads (title, description, id_category, points, statut, zip_code, city, urgent, id_user, date_execution)
VALUES (
    'Besoin d’aide pour faire mes courses',
    'Suite à une entorse à la cheville, je ne peux pas me déplacer facilement. Je cherche une personne pour m’aider à faire quelques courses au supermarché du quartier.',
    9,
    3,
    'disponible',
    '13010',
    'Marseille',
    false,
    1,
    '2026-05-02'
);

INSERT INTO requests (id_ad, id_helper, id_user) VALUES ('1', '2', '1');

INSERT INTO messages(content, id_sender, id_receiver, id_request) VALUES ('Bonjour, je serais ravis de vous aider.', 2,1,1);

INSERT INTO messages(content, id_sender, id_receiver, id_request) VALUES ('Super, vous êtes disponible quand ?', 1,2,1);