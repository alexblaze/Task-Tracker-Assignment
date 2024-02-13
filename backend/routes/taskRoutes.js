// taskRoutes.js

const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Define routes using controller methods
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.markTaskAsCompleted);
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
