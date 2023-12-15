/* TodoForm Component */
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  // State to manage the input value for a new todo
  const [newTodo, setNewTodo] = useState('');

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    // Check if the input is not empty before adding a new todo
    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo(''); // Clear the input after adding a new todo
    }
  };

  // Function to handle key press events, specifically Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="add-todo">
      {/* Input field for adding a new todo */}
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress} // Call handleKeyPress on key press
      />
      {/* Button to trigger adding a new todo */}
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
