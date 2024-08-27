import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, completeTodo, removeTodo, editTodo, filter }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'uncompleted') return !todo.isCompleted;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
