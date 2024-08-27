import React, { useState } from 'react';
import RegisterUser from './components/RegisterUser';
import SearchUser from './components/SearchUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="App">
      <h1>User Management Application</h1>
      <RegisterUser addUser={addUser} />
      <SearchUser users={users} />
    </div>
  );
}

export default App;
