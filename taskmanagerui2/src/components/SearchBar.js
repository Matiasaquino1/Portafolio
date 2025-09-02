import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Buscar tareas..."
      value={searchTerm}
      onChange={e => onSearch(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;