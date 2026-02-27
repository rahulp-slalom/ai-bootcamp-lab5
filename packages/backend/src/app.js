const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for TODOs
// FIXED: Initialize as empty array
let todos = [];

// FIXED: Add counter for ID generation
let nextId = 1;

// INTENTIONAL LINT VIOLATION (for Step 5-2): Unused variable should be removed or used
const unusedDebugFlag = true;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/todos - Get all todos
// FIXED: Now works correctly with array initialization
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST /api/todos - Create a new todo
// FIXED: Implement endpoint with validation
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  // Validate title
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  // Create new todo
  const newTodo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update a todo
// FIXED: Implement endpoint with validation
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  
  const todo = todos.find((t) => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update only the title
  if (title !== undefined) {
    todo.title = title;
  }
  
  res.json(todo);
});

// PATCH /api/todos/:id/toggle - Toggle todo completion status
// FIXED: Toggle instead of always setting to true
app.patch('/api/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // FIXED: Toggle the completed status
  todo.completed = !todo.completed;

  res.json(todo);
});

// DELETE /api/todos/:id - Delete a todo
// FIXED: Implement endpoint with validation
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

// INTENTIONAL ISSUE: Missing error handling middleware

module.exports = app;
