const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(category) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      category.name,
    ]);
  }

  update(category) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [category.name, category.id]
    );
  }

  insert(category) {
    console.log(category);
    return this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [category.name]
    );
  }

  edit(category) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [category.name, category.id]
    );
}
}

module.exports = CategoryManager;