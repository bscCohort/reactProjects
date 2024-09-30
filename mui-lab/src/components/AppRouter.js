// AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserManagement from './UserManagement';
import AddUserFormPage from './AddUserFormPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/add-user" element={
          <AddUserFormPage 
            onAddUser={(newUser) => {
              console.log('Adding user:', newUser);
              // Add logic to actually add the user to your data store here
            }} 
          />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
