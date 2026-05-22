const AbstractManager = require('./AbstractManager');

class RequestManager extends AbstractManager {
  constructor() {
    super({ table: 'requests' });
  }

  create(request) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_ad, id_helper, id_user) VALUES (?, ?, ?)`,
      [request.id_ad, request.id_helper, request.id_user]
    );
  }

  findByHelper(id_helper) {
    return this.database.query(
      `SELECT r.*, a.title, a.points, c.name as category_name,
              u.firstname as needer_firstname, u.lastname as needer_lastname
       FROM ${this.table} r
       JOIN ads a ON a.id = r.id_ad
       LEFT JOIN categories c ON c.id = a.id_category
       LEFT JOIN users u ON u.id = r.id_user
       WHERE r.id_helper = ?`,
      [id_helper]
    );
  }

  findHistoryByUser(id_user) {
    return this.database.query(
      `SELECT r.date_creation, a.title,
              CASE WHEN r.id_helper = ? THEN a.points ELSE -a.points END as delta
       FROM ${this.table} r
       JOIN ads a ON a.id = r.id_ad
       WHERE (r.id_helper = ? OR r.id_user = ?) AND r.status = 'terminé'
       ORDER BY r.date_creation DESC`,
      [id_user, id_user, id_user]
    );
  }

  update(request) {
    return this.database.query(
      `UPDATE ${this.table} SET status = ? WHERE id = ?`,
      [request.status, request.id]
    );
  }
}

module.exports = RequestManager;