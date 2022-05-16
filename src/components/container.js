import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Carlist from './carlist';
import { width } from '@mui/system';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#cfe8fc', height: '500px' }}>
        <Carlist/>
        </Box>
      </Container>
    </React.Fragment>
  );
}