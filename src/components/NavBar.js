import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{justifyContent: "space-around"}}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ello
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/reading-list">Reading List</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
