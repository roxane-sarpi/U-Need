require("dotenv").config();
const mysql = require("mysql2/promise");

// ============================================================
// Données de seed U-Need (TRUNCATE + INSERT)
// Le bloc TRUNCATE remet les tables à zéro et réinitialise les
// AUTO_INCREMENT : le seed est rejouable sans casser les IDs.
// Mots de passe : tous hashés argon2id, valeur en clair = "123456"
// ============================================================
const hash123456 =
  "$argon2id$v=19$m=65536,t=5,p=1$QnIcUleYp8yxWg2Dc7VH/w$6aMeye/56yzWNFm7axI6bmX/Wl506Z2l3iq/fRDpeh4";

const seedSQL = `
  SET FOREIGN_KEY_CHECKS = 0;
  TRUNCATE TABLE messages;
  TRUNCATE TABLE requests;
  TRUNCATE TABLE evaluations;
  TRUNCATE TABLE notifications;
  TRUNCATE TABLE ads;
  TRUNCATE TABLE users;
  TRUNCATE TABLE categories;
  SET FOREIGN_KEY_CHECKS = 1;

  INSERT INTO categories (name) VALUES
  ('Déménagement'), ('Bricolage'), ('Aide ménagère'), ('Aide aux séniors'),
  ('Informatique'), ('Petit travaux'), ('Course'), ('Animaux'),
  ('Jardinerie'), ('Transport'), ('Aide scolaire'), ('Autre');

  INSERT INTO users (firstname, lastname, email, password, phone, zip_code, city, role, points) VALUES
  ('Paul',   'LeDu',   'paul@test.com',   '${hash123456}', '0654322343', '13010', 'Marseille', 'user',        10),
  ('Roxane', 'Sarpi',  'roxane@test.com', '${hash123456}', '0743453224', '13015', 'Marseille', 'admin',        0),
  ('Vero',   'Lastar', 'vero@test.com',   '${hash123456}', '0432345432', '13005', 'Marseille', 'user',        10),
  ('Akio',   'Kimura', 'akio@test.com',   '${hash123456}', '0654322343', '13001', 'Marseille', 'moderateur',   0);

  INSERT INTO ads (title, description, id_category, points, statut, zip_code, city, urgent, id_user, date_execution) VALUES
  ('Besoin pour arroser mes plantes',
   'Ayant eu un accident me bloquant le dos, je ne peux plus arroser mes plantes. Je cherche une personne qui pourra venir arroser mes plantes.',
   9, 2, 'disponible', 13010, 'Marseille', false, 1, '2026-04-30'),
  ('Besoin d''aide pour faire mes courses',
   'Suite à une entorse à la cheville, je ne peux pas me déplacer facilement. Je cherche une personne pour m''aider à faire quelques courses au supermarché du quartier.',
   9, 3, 'disponible', 13010, 'Marseille', false, 1, '2026-05-02');

  INSERT INTO requests (id_ad, id_helper, id_user) VALUES (1, 2, 1);

  INSERT INTO messages (content, id_sender, id_receiver, id_request) VALUES
  ('Bonjour, je serais ravis de vous aider.', 2, 1, 1),
  ('Super, vous êtes disponible quand ?',     1, 2, 1);
`;

const seed = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      multipleStatements: true,
    });

    await connection.query(seedSQL);

    console.info("Seed done !");
  } catch (err) {
    console.error("Error seeding the database:", err);
    process.exitCode = 1;
  } finally {
    if (connection) await connection.end();
  }
};

seed();
