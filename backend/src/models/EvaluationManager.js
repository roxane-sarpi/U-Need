const AbstractManager = require('./AbstractManager');

class EvaluationManager extends AbstractManager {
  constructor() {
    super({ table: 'evaluations' });
  }

  create(evaluation) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_user, note) VALUES (?, ?)`,
      [evaluation.id_user, evaluation.note]
    );
  }

  findByUser(id_user) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_user = ?`,
      [id_user]
    );
  }

  update(evaluation) {
    return this.database.query(
      `UPDATE ${this.table} SET note = ? WHERE id = ?`,
      [evaluation.note, evaluation.id]
    );
  }
}

module.exports = EvaluationManager;
