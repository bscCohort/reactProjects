import React, { useState } from 'react';
import { Container, Typography, Snackbar, Alert } from '@mui/material';
import AddUserForm from './AddUserForm';
import { useNavigate } from 'react-router-dom';

function AddUserFormPage({ onAddUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleAddUser = async (newUser) => {
    try {
      // Add a loading indicator if needed or handle the user add asynchronously
      if (typeof onAddUser === 'function') {
        await Promise.resolve(onAddUser(newUser)); // Ensure async handling if needed
      }
      showSnackbar('User added successfully', 'success');

      // Delay navigation to allow snackbar to be visible
      setTimeout(() => {
        navigate('/users');
      }, 2000); 
    } catch (error) {
      showSnackbar('Failed to add user', 'error');
      console.error('Error adding user:', error);
    }
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
