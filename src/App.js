import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Add new Todo
  const addTodo = () => {
    if (newTodo) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: newTodo, status: 'Pending' },
      ]);
      setNewTodo('');
    }
  };

  // Mark Todo as completed
  const markComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: 'Completed' } : todo
      )
    );
  };

  // Remove Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1 className="todo-header">To-Do List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className={`todo-title ${todo.status}`}>
              <span>{todo.title}</span>
              <div className="todo-actions">
                <button
                  className="complete-btn"
                  onClick={() => markComplete(todo.id)}
                >
                  ✔️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
            <span className={`todo-status ${todo.status}`}>
              {todo.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
