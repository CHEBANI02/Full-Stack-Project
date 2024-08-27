import React, { useState } from 'react';
import './SearchUser.css';

const SearchUser = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundUser = users.find((u) => u.name === searchTerm);
    setUser(foundUser || null);
  };

  return (
    <div className="container search-user">
      <h2>Search User</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {user && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      {user === null && searchTerm && <p className="user-not-found">User not found</p>}
    </div>
  );
};

export default SearchUser;
