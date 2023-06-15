const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ username, password, email }) {
    return this.database.query(
      `insert into ${this.table} (username, password, email) values (?, ?, ?)`,
      [username, password, email]
    );
  }

  update(user) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  getUserByUsername(username) {
    return this.database.query(
      `select * from ${this.table} where username = ?`,
      [username]
    );
  }
}
module.exports = UserManager;
