-- ============================================================
-- U-Need — Schéma de base de données (tables uniquement)
-- migrate.js fait déjà le `USE ${DB_NAME}` : pas de CREATE DATABASE / USE ici.
-- Les INSERT de seed sont déplacés dans seed.js (à lancer une seule fois).
-- ============================================================

-- 1. Tables "parentes"
CREATE TABLE IF NOT EXISTS categories (
    id   INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname  VARCHAR(100) NOT NULL,
    email     VARCHAR(100) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    phone     VARCHAR(20)  NOT NULL,
    zip_code  VARCHAR(10),
    city      VARCHAR(100) NOT NULL,
    role      ENUM('admin', 'user', 'moderateur') DEFAULT 'user',
    points    INT DEFAULT 0
);

-- 2. Table ads (dépend de categories et users)
CREATE TABLE IF NOT EXISTS ads (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    title          VARCHAR(100) NOT NULL,
    description    TEXT NOT NULL,
    image_1        VARCHAR(500) DEFAULT '/public/images/default_image.svg',
    image_2        VARCHAR(500) DEFAULT '/public/images/default_image.svg',
    image_3        VARCHAR(500) DEFAULT '/public/images/default_image.svg',
    id_category    INT,
    points         INT NOT NULL,
    statut         ENUM('signalé', 'en cours', 'terminé', 'disponible') DEFAULT 'disponible',
    zip_code       INT NOT NULL,
    city           VARCHAR(500) NOT NULL,
    urgent         BOOLEAN NOT NULL DEFAULT FALSE,
    id_user        INT,
    date_execution DATE,
    date_creation  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES categories(id),
    CONSTRAINT fk_user     FOREIGN KEY (id_user)     REFERENCES users(id)
);

-- 3. Autres tables
CREATE TABLE IF NOT EXISTS messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_sender   INT NOT NULL,
    id_receiver INT NOT NULL,
    id_request  INT NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    content       VARCHAR(500) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    has_been_read BOOLEAN DEFAULT FALSE,
    id_user       INT,
    CONSTRAINT fk_userNotif FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS requests (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    id_ad         INT NOT NULL,
    id_helper     INT,
    id_user       INT,
    status        ENUM('signalé', 'en cours', 'terminé') DEFAULT 'en cours',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_adRequest FOREIGN KEY (id_ad)     REFERENCES ads(id),
    CONSTRAINT fk_helper    FOREIGN KEY (id_helper) REFERENCES users(id),
    CONSTRAINT fk_needer    FOREIGN KEY (id_user)   REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS evaluations (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    id_user    INT NOT NULL,
    note       INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_eval_user FOREIGN KEY (id_user) REFERENCES users(id)
);

INSERT INTO categories (name) VALUES
  ('Déménagement'), ('Bricolage'), ('Aide ménagère'), ('Aide aux séniors'),
  ('Informatique'), ('Petit travaux'), ('Course'), ('Animaux'),
  ('Jardinerie'), ('Transport'), ('Aide scolaire'), ('Autre');

INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role) VALUES
('Wendy', 'test', 'wendy@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$ymncECWbe+GNXT5yiPpjrQ$Y6DLc9D8T4/6xpp0R4YrCI0J5QRfrNtuaPxlAjs8r8w', '0612345678', '75000', 'Paris', 'user' ),
('admin', 'admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$ymncECWbe+GNXT5yiPpjrQ$Y6DLc9D8T4/6xpp0R4YrCI0J5QRfrNtuaPxlAjs8r8w', '0612345678', '75000', 'Paris', 'admin' ),
('Alice', 'Dupont', 'alice@example.com', '$argon2id$v=19$m=65536,t=5,p=1$ymncECWbe+GNXT5yiPpjrQ$Y6DLc9D8T4/6xpp0R4YrCI0J5QRfrNtuaPxlAjs8r8w', '0600000001', '75001', 'Paris', 'user'),
('Bob', 'Martin', 'bob@example.com', '$argon2id$v=19$m=65536,t=5,p=1$ymncECWbe+GNXT5yiPpjrQ$Y6DLc9D8T4/6xpp0R4YrCI0J5QRfrNtuaPxlAjs8r8w', '0600000002', '75002', 'Paris', 'user'),
('Charlie', 'Legrand', 'charlie@example.com', '$argon2id$v=19$m=65536,t=5,p=1$ymncECWbe+GNXT5yiPpjrQ$Y6DLc9D8T4/6xpp0R4YrCI0J5QRfrNtuaPxlAjs8r8w', '0600000003', '75003', 'Paris', 'user');

INSERT INTO ads (title, description, id_category, points, zip_code, city, urgent, id_user) VALUES
('Tondre la pelouse', 'Besoin d''aide pour tondre 100m2', 1, 5, 75010, 'Paris', FALSE, 1),
('Aide pour déménagement', 'Déménagement de studio à 10km', 2, 10, 75011, 'Paris', TRUE, 5),
('Monter meuble IKEA', 'Montage de meuble (2h)', 3, 3, 75012, 'Paris', FALSE, 3);

INSERT INTO requests (id_ad, id_helper, id_user, status) VALUES
(1, 4, 1, 'en cours'),
(2, 4, 5, 'terminé'),
(3, 1, 3, 'en cours');

INSERT INTO messages (content, id_sender, id_receiver, id_request) VALUES
('Bonjour, je peux t''aider samedi matin', 4, 1, 1),
('Merci -- samedi ça marche', 1, 4, 1),
('Le camion est réservé', 4, 5, 2),
('Salut, as-tu les instructions pour le montage?', 3, 1, 3);

