const AbstractManager = require("./AbstractManager");

class categoryManager extends AbstractManager {
  constructor() {
    super({ table: "category_task" });
  }

  insert({ name, color }) {
    return this.database.query(
      `insert into ${this.table} (name, color) values (?, ?)`,
      [name, color]
    );
  }

  update(category) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      category,
      category.id,
    ]);
  }
}

module.exports = categoryManager;
