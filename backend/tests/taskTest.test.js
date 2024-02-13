// Task.test.js

const Task = require("../models/taskModel");

describe("Task Model", () => {
  beforeAll((done) => {
    // Ensure that the tasks table is empty before running tests
    Task.deleteById(1, () => {
      Task.deleteById(2, () => {
        done();
      });
    });
  });

  afterAll((done) => {
    // Clean up after tests
    Task.deleteById(1, () => {
      Task.deleteById(2, () => {
        done();
      });
    });
  });

  describe("getAll()", () => {
    it("should return an empty array when there are no tasks", (done) => {
      Task.getAll((err, tasks) => {
        expect(err).toBeNull();
        expect(tasks).toEqual([]);
        done();
      });
    });
  });

  describe("create()", () => {
    it("should create a new task", (done) => {
      Task.create("Test Task", (err, newTask) => {
        expect(err).toBeNull();
        expect(newTask).toHaveProperty("id");
        expect(newTask.description).toBe("Test Task");
        expect(newTask.completed).toBe(false);
        done();
      });
    });
  });

  describe("markAsCompleted()", () => {
    it("should mark a task as completed", (done) => {
      Task.create("Task to be completed", (err, newTask) => {
        Task.markAsCompleted(newTask.id, (markErr) => {
          expect(markErr).toBeNull();
          Task.getAll((getAllErr, tasks) => {
            const completedTask = tasks.find((task) => task.id === newTask.id);
            expect(completedTask.completed).toBe(true);
            done();
          });
        });
      });
    });
  });

  describe("deleteById()", () => {
    it("should delete a task by ID", (done) => {
      Task.create("Task to be deleted", (err, newTask) => {
        Task.deleteById(newTask.id, (deleteErr) => {
          expect(deleteErr).toBeNull();
          Task.getAll((getAllErr, tasks) => {
            const deletedTask = tasks.find((task) => task.id === newTask.id);
            expect(deletedTask).toBeUndefined();
            done();
          });
        });
      });
    });

    it("should return an error if task with given ID does not exist", (done) => {
      Task.deleteById(999, (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });
  });
});
