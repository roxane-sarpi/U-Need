const AbstractManager = require("./AbstractManager");

class AdManager extends AbstractManager {
  constructor() {
    super({ table: "ads" });
  }

  insert(ad) {
    return this.database.query(`insert into ${this.table} (title, description, image_1, image_2, image_3, id_category, points, statut, zip_code, city, urgent, id_user, date_execution) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      ad.title,
      ad.description,
      ad.image_1,
      ad.image_2,
      ad.image_3,
      ad.id_category,
      ad.points,
      ad.statut,
      ad.zip_code,
      ad.city,
      ad.urgent,
      ad.id_user,
      ad.date_execution
    ]);
  }

  update(ad) {
    return this.database.query(
      `update ${this.table} set title = ?, description = ?, image_1 = ?, image_2 = ?, image_3 = ?, id_category = ?, points = ?, statut = ?, zip_code = ?, city = ?, urgent = ?, date_execution = ? where id = ?`,
      [ad.title, ad.description, ad.image_1, ad.image_2, ad.image_3, ad.id_category, ad.points, ad.statut, ad.zip_code, ad.city, ad.urgent, ad.date_execution, ad.id]
    );
  }
}

module.exports = AdManager;