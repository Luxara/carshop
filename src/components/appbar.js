import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function SimpleAppBar() {

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="sticky">
        <Toolbar>
          <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CarShop
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}