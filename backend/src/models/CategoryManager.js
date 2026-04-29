const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(category) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      category.title,
    ]);
  }

  update(category) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [category.title, category.id]
    );
  }
}

module.exports = CategoryManager;