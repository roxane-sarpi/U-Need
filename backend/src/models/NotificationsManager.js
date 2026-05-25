const AbstractManager = require("./AbstractManager");

class NotificationsManager extends AbstractManager {
  constructor() {
    super({ table: "notifications" });
  }

  readByUserId(userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_user = ?`,
      [userId]
    );
  }
  
    insert(notifications) {  
  return this.database.query(`insert into ${this.table} (content, id_user) values (? , ?)`, 
    [ notifications.content,  notifications.id_user ]
    );
  }
    update(notifications) {
    return this.database.query(
      `update ${this.table} set has_been_read = ? where id = ?`,
      [notifications.has_been_read ?? false, notifications.id]
    );
  }
}

module.exports = NotificationsManager;