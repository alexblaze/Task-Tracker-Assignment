// taskController.js

const Task = require("../models/taskModel");

// Controller methods for handling tasks
const taskController = {
  getAllTasks: (req, res) => {
    Task.getAll((err, tasks) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(tasks);
    });
  },

  createTask: (req, res) => {
    const { description } = req.body;
    Task.create(description, (err, newTask) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(newTask);
    });
  },

  markTaskAsCompleted: (req, res) => {
    const { id } = req.params;
    Task.markAsCompleted(id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: id, message: "Task marked as completed" });
    });
  },

  deleteTaskById: (req, res) => {
    const { id } = req.params;
    Task.deleteById(id, (err) => {
      if (err) {
        if (err.message === "Task not found") {
          res.status(404).json({ message: "Task not found" });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.json({ message: "Task deleted successfully" });
    });
  },
};

module.exports = taskController;
