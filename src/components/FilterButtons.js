/* FilterButton Component */
import React from 'react';

const FilterButtons = ({ filter, onFilterChange }) => {
  const filters = ['all', 'completed', 'incomplete'];

  return (
    <div className="filter-radio-buttons">
      {/* Map through filters and create radio buttons for each filter */}
      {filters.map((f) => (
        <label key={f}>
          <input
            type="radio"
            value={f}
            checked={filter === f}
            onChange={() => onFilterChange(f)}
          />
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default FilterButtons;
