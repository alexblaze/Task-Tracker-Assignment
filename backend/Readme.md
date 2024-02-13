# Task Tracker

Task Tracker is a simple Node.js application built with Express and SQLite, designed to help you manage your tasks efficiently.

## Features

- View a list of tasks
- Add new tasks
- Mark tasks as completed
- Delete tasks

## Installation

1. Clone the repository:

git clone https://github.com/alexblaze/Task-Tracker-Assignment.git

2. Navigate to the project directory:

3. Install dependencies:

npm install

4. Start the server:

5. Access the application in your browser at `http://localhost:8080`.

## Usage

- To view all tasks, navigate to `http://localhost:8080/tasks` in your browser or use an API testing tool like Postman.
- To add a new task, send a POST request to `http://localhost:8080/tasks` with a JSON body containing the task description.
- To mark a task as completed, send a PUT request to `http://localhost:8080/tasks/:id`, replacing `:id` with the ID of the task you want to mark as completed.
- To delete a task, send a DELETE request to `http://localhost:8080/tasks/:id`, replacing `:id` with the ID of the task you want to delete.

## Testing

To run tests, use the following command:

npm test

## Dependencies

- Express: Web application framework for Node.js
- SQLite3: Asynchronous, non-blocking SQLite3 bindings for Node.js
- Nodemon: Monitor for changes in your application and automatically restart the server
- Jest: Testing framework for JavaScript applications
- Supertest: SuperAgent driven library for testing HTTP servers
