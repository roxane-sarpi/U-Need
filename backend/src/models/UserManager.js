const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password, phone, zip_code, city, role, points)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.phone,
        user.zip_code,
        user.city,
        user.role ?? "user",
        user.points ?? 10,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, phone = ?, zip_code = ?, role = ?, city = ?, points = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.phone,
        user.zip_code,
        user.role,
        user.city,
        user.points,
        user.id,
      ]
    );
  }

  findById(id) {
    return this.database.query(`select * from ${this.table} where id = ?`, [id]);
  }

  findByEmail(email) {
    return this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  }

  count() {
    return this.database.query(
      `select count(*) as total_users from ${this.table}`
    );
  }

  sumPoints() {
    return this.database.query(
      `select SUM(points) as total_points from ${this.table}`
    );
  }
}

module.exports = UserManager;
