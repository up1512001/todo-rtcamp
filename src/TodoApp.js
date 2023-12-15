import React, { useState, useEffect } from 'react';
import AppTitle from './components/AppTitle';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import SearchBar from './components/SearchBar';
import './TodoApp.css';

const TodoApp = () => {
  // State hooks to manage todos and other related data
  const [todos, setTodos] = useState(() => {
    try {
      // Attempt to load todos from localStorage
      const storedTodos = localStorage.getItem('todos');
      // Return parsed todos if available, otherwise return an empty array
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      // Log an error if there is an issue loading todos
      console.error('Error loading todos from localStorage:', error);
      // Return an empty array in case of an error
      return [];
    }
  });

  // State hooks for managing editing state
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  // State hooks for managing filter and search term
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo
  const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      // Add a new todo with a unique ID and default completed state
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    }
  };

  // Functions for managing todo editing
  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
  };

  const saveEditing = (id, newText) => {
    // Update the text of the todo being edited
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    // Reset editing state after saving
    setEditingTodoId(null);
    setEditingTodoText(newText);
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    // Filter out the todo with the specified ID
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to toggle the completion state of a todo
  const toggleComplete = (id) => {
    // Toggle the completed state of the todo with the specified ID
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to handle changes in the filter
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Function to handle changes in the search term
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Function to filter and sort todos based on filter and search term
  const filteredTodos = () => {
    let filteredList = todos;

    // Apply filter based on completion status
    switch (filter) {
      case 'completed':
        filteredList = filteredList.filter((todo) => todo.completed);
        break;
      case 'incomplete':
        filteredList = filteredList.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    // Apply search term filter
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredList = filteredList.filter((todo) =>
        todo.text.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Reverse the list to show latest todos at the top
    return filteredList;
  };

  // Render the TodoApp component
  return (
    <div className="todo-app">
      {/* App title component */}
      <AppTitle />

      {/* TodoForm component for adding new todos */}
      <TodoForm addTodo={addTodo} />

      {/* FilterButtons component for selecting filter options */}
      <FilterButtons filter={filter} onFilterChange={handleFilterChange} />

      {/* SearchBar component for entering search terms */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* TodoList component to display and manage todos */}
      <TodoList
        todos={filteredTodos()}
        editingTodoId={editingTodoId}
        editingTodoText={editingTodoText}
        onCancelEditing={cancelEditing}
        onSaveEditing={saveEditing}
        onStartEditing={startEditing}
        onDeleteTodo={deleteTodo}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

// Export the TodoApp component
export default TodoApp;
