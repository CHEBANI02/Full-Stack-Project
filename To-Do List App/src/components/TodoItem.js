import React, { useState } from 'react';

const TodoItem = ({ todo, index, completeTodo, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <li className={todo.isCompleted ? 'complete' : ''}>
      {isEditing ? (
        <input 
          type="text" 
          value={newText} 
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        <button onClick={() => completeTodo(index)}>
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => removeTodo(index)}>Remove</button>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
