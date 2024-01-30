const express = require("express");
const cors = require("cors");
const pool = require("./db");

// App & PORT
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a task
app.post("/tasks", async (request, response) => {
  try {
    const {
      body: { title, description, status },
    } = request;
    const newTask = await pool.query(
      "INSERT INTO task (title, description, status) VALUES($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    response.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all tasks
app.get("/tasks", async (request, response) => {
  try {
    const tasks = await pool.query("SELECT * FROM task");
    response.json(tasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a task
app.get("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const task = await pool.query("SELECT * FROM task WHERE task_id = $1", [
      id,
    ]);
    return response.json(task.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a task
app.put("/tasks/:id", async (request, response) => {
  try {
    const {
      body: { title, description, status },
      params: { id },
    } = request;
    const updateTask = await pool.query(
      "UPDATE task SET title = $1, description = $2, status = $3  WHERE task_id = $4",
      [title, description, status, id]
    );
    response.json("Task Updated");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a task
app.delete("/tasks/:id", async (request, response) => {
  try {
    const {
      params: { id },
    } = request;
    const deleteTask = await pool.query("DELETE FROM task WHERE task_id = $1", [
      id,
    ]);
    response.json("Task Deleted");
  } catch (error) {
    console.error(error.message);
  }
});

// Staring server on PORT
app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
