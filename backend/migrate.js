require('dotenv').config()
const fs = require('fs')
const mysql = require('mysql2/promise')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

  let connection
  let retries = 10

  while (retries > 0) {
    try {
      connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        multipleStatements: true,
      })
      break
    } catch (err) {
      console.log(`DB not ready, retrying... (${retries} attempts left)`)
      retries--
      await wait(3000)
    }
  }

  if (!connection) {
    console.error('Could not connect to database.')
    process.exit(1)
  }

  const sql = fs.readFileSync('./database/schema.sql', 'utf8')
  await connection.query(sql)

  try {
    const [rows] = await connection.query(
      `SELECT COUNT(*) as cnt FROM information_schema.columns WHERE table_schema = ? AND table_name = 'ads' AND column_name = 'status'`,
      [DB_NAME]
    )
    if (rows[0].cnt === 0) {
      await connection.query(
        "ALTER TABLE ads ADD COLUMN status ENUM('signalé','en cours','terminé','disponible') DEFAULT 'disponible'"
      )
    }
  } catch (err) {
    console.warn('Could not ensure ads.status column:', err && err.message)
  }

  await connection.end()
  console.log('Migration done !')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
