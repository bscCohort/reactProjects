import React from 'react';
import { Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box 
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        textAlign: 'center',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '10px 0'
      }}>
      <Typography variant="body2">
        © 2024 MUI CRUD App
      </Typography>
    </Box>
  );
}

export default Footer;
