import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const setFilterAndUpdate = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilterAndUpdate('all')}
          >
            All
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilterAndUpdate('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'uncompleted' ? 'active' : ''} 
            onClick={() => setFilterAndUpdate('uncompleted')}
          >
            Uncompleted
          </button>
        </div>
        <TodoList 
          todos={todos} 
          completeTodo={completeTodo} 
          removeTodo={removeTodo} 
          editTodo={editTodo} 
          filter={filter} 
        />
      </header>
    </div>
  );
}

export default App;
