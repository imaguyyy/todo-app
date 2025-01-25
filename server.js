// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// MongoDB Atlas connection string (replace <db_password> with your password)
const dbURI = 'mongodb+srv://blankgrrr:Imaguy15%40@cluster0.c5aez.mongodb.net/todolistApp?retryWrites=true&w=majority&appName=Cluster0';

const cors = require('cors');
app.use(cors()); // Add this line to use CORS

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
  });

// Create a Schema for To-Do items
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

// Create a Model from the Schema
const Todo = mongoose.model('Todo', todoSchema);

// Route to create a new To-Do item
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  const newTodo = new Todo({
    title,
    description,
  });

  newTodo.save()
    .then(() => res.status(201).json({ message: 'To-Do Created', todo: newTodo }))
    .catch((err) => res.status(500).json({ message: 'Error creating To-Do', error: err }));
});

// Route to get all To-Do items
app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => res.status(200).json({ todos }))
    .catch((err) => res.status(500).json({ message: 'Error fetching To-Dos', error: err }));
});

// Route to update the status of a To-Do item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Todo.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedTodo) => res.status(200).json({ message: 'To-Do Updated', todo: updatedTodo }))
    .catch((err) => res.status(500).json({ message: 'Error updating To-Do', error: err }));
});

// Route to delete a To-Do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'To-Do Deleted' }))
    .catch((err) => res.status(500).json({ message: 'Error deleting To-Do', error: err }));
});

// Set the server to listen on port 4100
const port = 5004;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
