// Task.js

const db = require("../config/dbConfig");

// Task model
class Task {
  constructor(id, title, description, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  static getAll(callback) {
    db.all(
      "SELECT id, title, description, completed FROM tasks",
      (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const tasks = rows.map(
          (row) => new Task(row.id, row.title, row.description, !!row.completed)
        );
        callback(null, tasks);
      }
    );
  }

  static create(title, description, callback) {
    db.run(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [title, description, false],
      function (err) {
        if (err) {
          callback(err, null);
          return;
        }
        const newTask = new Task(this.lastID, title, description, false);
        callback(null, newTask);
      }
    );
  }

  static markAsCompleted(id, callback) {
    db.run(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [true, id],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        callback(null);
      }
    );
  }

  static deleteById(id, callback) {
    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
      if (err) {
        callback(err);
        return;
      }
      if (this.changes === 0) {
        callback(new Error("Task not found"));
        return;
      }
      callback(null);
    });
  }
}

module.exports = Task;
