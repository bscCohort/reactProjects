import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        Welcome to the MUI CRUD App
      </Typography>
      <Typography variant="body1" mb={3}>
        Navigate to the User Management section to manage users.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link}
        to="/users"
      >
        Go to User Management
      </Button>
    </Box>
  );
}

export default Home;
