const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

// Create a new To-Do
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = new Todo({ title, description, status });
    await newTodo.save();
    res.status(201).json({ message: 'To-Do Created', todo: newTodo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating To-Do', error: err });
  }
});

// Get all To-Dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching To-Dos', error: err });
  }
});

// Update a To-Do's status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!todo) return res.status(404).json({ message: 'To-Do not found' });
    res.status(200).json({ message: 'To-Do Updated', todo });
  } catch (err) {
    res.status(500).json({ message: 'Error updating To-Do', error: err });
  }
});

// Delete a To-Do
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'To-Do not found' });
    res.status(200).json({ message: 'To-Do Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting To-Do', error: err });
  }
});

module.exports = router;
