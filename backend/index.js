// index.js

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { notFounnd, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for /tasks
app.use("/api/tasks", taskRoutes);

app.use(notFounnd);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
