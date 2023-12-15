/* TodoList Component */
import React from 'react';
import BinImage from '../assets/images/bin.svg';
import EditPen from '../assets/images/edit-pen.svg';

const TodoList = ({
  todos,
  editingTodoId,
  editingTodoText,
  onCancelEditing,
  onSaveEditing,
  onStartEditing,
  onDeleteTodo,
  onToggleComplete,
}) => {
  // Reverse the todos array to show the latest todos at the top
  const reversedTodos = [...todos];

  // Function to handle key press events when editing
  const handleKeyPress = (event, todoId) => {
    if (event.key === 'Enter') {
      onSaveEditing(todoId, editingTodoText);
    }
  };

  return (
    <ul>
      {/* Map through reversed todos to display them */}
      {reversedTodos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {editingTodoId === todo.id ? (
            /* Render input field and buttons when editing a todo */
            <>
              <input
                type="text"
                value={editingTodoText}
                onChange={(e) => onStartEditing(todo.id, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, todo.id)}
              />
              <button onClick={() => onSaveEditing(todo.id, editingTodoText)}>
                Save
              </button>
              <button onClick={onCancelEditing}>Cancel</button>
            </>
          ) : (
            /* Render todo details when not in editing mode */
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => onStartEditing(todo.id, todo.text)}>
                <img src={EditPen} alt="Edit icon" />
              </button>
              <button
                className="delete-todo-btn"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <img src={BinImage} alt="Bin icon" />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
