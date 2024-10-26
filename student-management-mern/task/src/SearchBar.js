
import React from 'react';
import './styles/Searchbar.css';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or id"
      value={searchTerm}
      onChange={onSearch}
      className="search-bar"
      
    />
  );
};

export default SearchBar;
