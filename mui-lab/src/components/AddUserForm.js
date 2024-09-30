// pages/AddUserFormPage.js

import React, { useState } from 'react';
import { Container, Typography, Snackbar, Alert } from '@mui/material';
import AddUserForm from './AddUserForm';
import { useNavigate } from 'react-router-dom';

function AddUserFormPage({ onAddUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleAddUser = (newUser) => {
    if (typeof onAddUser === 'function') {
      onAddUser(newUser);
    }
    showSnackbar('User added successfully', 'success');
    setTimeout(() => {
      navigate('/users');
    }, 2000); // Navigate after 2 seconds to allow snackbar to be seen
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
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Add New User
      </Typography>
      <AddUserForm onAddUser={handleAddUser} />
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
    </Container>
  );
}

export default AddUserFormPage;
