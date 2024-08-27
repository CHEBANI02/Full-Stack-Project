// src/components/Filter.jsx

import React, { useState } from 'react';

function Filter({ onChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = () => {
    onChange(searchQuery.trim().toLowerCase());
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search by author or publisher"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleFilterChange}>Search</button>
    </div>
  );
}

export default Filter;
