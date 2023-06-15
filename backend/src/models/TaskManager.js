const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }

  insert({ title, categoryId, description, duration, userId }) {
    return this.database.query(
      `insert into ${this.table} (title, category_id, description, duration, user_id) values (?, ?, ?, ?, ?)`,
      [title, categoryId, description, duration, userId]
    );
  }

  update(task) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      task,
      task.id,
    ]);
  }

  findAllWithCategory(id) {
    return this.database.query(
      `SELECT ${this.table}.*, category_task.name, category_task.color, category_task.id AS category_id
      FROM task
      LEFT JOIN category_task ON task.category_id = category_task.id
      JOIN user ON task.user_id = user.id
      WHERE user.id = ?;`,
      [id]
    );
  }
}
module.exports = UserManager;
