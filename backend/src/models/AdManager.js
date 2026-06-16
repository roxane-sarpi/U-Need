const AbstractManager = require("./AbstractManager");

class AdManager extends AbstractManager {
  constructor() {
    super({ table: "ads" });
  }

  insert(ad) {
    return this.database.query(`insert into ${this.table} (title, description, image_1, image_2, image_3, id_category, points, status, zip_code, city, urgent, id_user, date_execution) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      ad.title,
      ad.description,
      ad.image_1,
      ad.image_2,
      ad.image_3,
      ad.id_category,
      ad.points,
      ad.status,
      ad.zip_code,
      ad.city,
      ad.urgent,
      ad.id_user,
      ad.date_execution
    ]);
  }

  findAllWithDetails() {
    return this.database.query(
      `SELECT a.*, c.name AS category_name, u.firstname, u.lastname
       FROM ${this.table} a
       LEFT JOIN categories c ON c.id = a.id_category
       LEFT JOIN users u ON u.id = a.id_user
       ORDER BY a.date_creation DESC`
    );
  }

  findByIdWithDetails(id) {
    return this.database.query(
      `SELECT a.*, c.name AS category_name, u.firstname, u.lastname
       FROM ${this.table} a
       LEFT JOIN categories c ON c.id = a.id_category
       LEFT JOIN users u ON u.id = a.id_user
       WHERE a.id = ?`,
      [id]
    );
  }

  findByUser(id_user) {
    return this.database.query(
      `SELECT a.*, c.name as category_name FROM ${this.table} a
       LEFT JOIN categories c ON c.id = a.id_category
       WHERE a.id_user = ?`,
      [id_user]
    );
  }

  update(ad) {
    return this.database.query(
      `update ${this.table} set title = ?, description = ?, image_1 = ?, image_2 = ?, image_3 = ?, id_category = ?, points = ?, status = ?, zip_code = ?, city = ?, urgent = ?, date_execution = ? where id = ?`,
      [ad.title, ad.description, ad.image_1, ad.image_2, ad.image_3, ad.id_category, ad.points, ad.status, ad.zip_code, ad.city, ad.urgent, ad.date_execution, ad.id]
    );
  }

  updateStatus(id, status) {
    return this.database.query(
      `UPDATE ${this.table} SET status = ? WHERE id = ?`,
      [status, id]
    );
  }

  countAvailable(){
    return this.database.query(
      `SELECT count(*) as available_ads FROM ${this.table} WHERE status = 'disponible'`
    );
  }


  countAdsByCategories() {
    return this.database.query(
      `SELECT c.name, COUNT(a.id) as count 
       FROM categories c
       LEFT JOIN ads a ON c.id = a.id_category
       GROUP BY c.id
       ORDER BY count DESC`
    );
}

}

module.exports = AdManager;
