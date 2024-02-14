const express = require("express");
const cors = require("cors"); // Import cors package
const taskRoutes = require("./routes/taskRoutes");
const { notFounnd, errorHandler } = require("./middlewares/errorHandler");
const Task = require("./models/taskModel");

const app = express();
const PORT = process.env.PORT || 8080;

async function seedDummyTasks() {
  try {
    // Array with length 10 to generate 10 dummy tasks
    const dummyTasks = Array.from({ length: 5 }, (_, index) => ({
      title: `Task ${index + 1}`,
      description: `Description for Task ${index + 1}`,
    }));

    // Loop through the dummyTasks array and create tasks
    await Promise.all(
      dummyTasks.map(async (taskData) => {
        await Task.create(
          taskData.title,
          taskData.description,
          (err, newTask) => {
            if (err) {
              console.error("Error seeding task:", err.message);
              return;
            }
            console.log("Task seeded successfully:", newTask);
          }
        );
      })
    );
  } catch (err) {
    console.error("Error seeding tasks:", err);
  }
}

// Middleware to parse JSON bodies
app.use(express.json());

// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Route handler for /tasks
app.use("/api/tasks", taskRoutes);

app.use(notFounnd);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  seedDummyTasks();
});
