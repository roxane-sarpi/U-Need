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