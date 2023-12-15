/* SearchBar Component */
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      {/* Input field for searching todos */}
      <input
        className="search-input"
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
