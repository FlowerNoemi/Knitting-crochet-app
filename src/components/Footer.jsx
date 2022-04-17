import React from 'react';
import './footer.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
      
        <Container className='footerContainer' maxWidth='xxl'  >
            <Toolbar className='ToolBarContainer'  disableGutters  component='div'>
            <Box sx={{ mr: 2 }}>
                <Typography variant="subtitle2" gutterBottom component="div" sx={{ mb: 1}}>
                    <CopyrightIcon fontSize='small'/> 2022 Virág-Czuczor Noémi 
                    <LocalFloristIcon fontSize='small'/>
                </Typography>
               
            </Box>
            </Toolbar>
        </Container>

  );
};
export default Footer;