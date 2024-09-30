// pages/UserManagement.js

import React, { useState, useEffect } from 'react';
import { Typography, Snackbar, Alert, Button, Box } from '@mui/material';
import UserList from './UserList';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        showSnackbar('Error fetching users', 'error');
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    showSnackbar('User deleted successfully', 'error');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>

      {/* Navigation buttons */}
      <Box textAlign="center" mb={3}>
        <Button component={Link} to="/add-user" color="primary">
          Add New User
        </Button>
        <Button component={Link} to="/" color="secondary" sx={{ ml: 2 }}>
          Go Home
        </Button>
      </Box>

      <UserList users={users} onDeleteUser={deleteUser} />

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default UserManagement;
