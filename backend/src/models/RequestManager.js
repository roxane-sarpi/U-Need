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
}

module.exports = RequestManager;