import React, {useState } from 'react';
import './header.css'
import Logo from '../assets/wool.png';
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Hamburger from 'hamburger-react';





const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isOpen, setOpen] = useState(false)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpen(false);
  };

  return (
    <AppBar className='NavBar'  position="static" sx={{bgcolor: '#F5F5F4'}} >
        <Container className='NavBarContainer' maxWidth="xl" >
            <Toolbar className='ToolBarContainer'  disableGutters >
            <img src={Logo} alt="Knitting and Crochet logo" title="Knitting and Crochet logo"className='BrandLogo' />
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
            </Typography>
            <Box className='NavBox' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <Hamburger toggled={isOpen} toggle={setOpen}  />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}>
                    <MenuItem onClick={handleCloseNavMenu} >
                        <Link className='navbarLink' to='/'>Home</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} >
                        <Link className='navbarLink' to='/contact'>Contact</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} >
                        <Link className='navbarLink' to='/pattern'>Patterns</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} >
                        <Link className='navbarLink' to='/PatternEdit'>Pattern Editor</Link>
                    </MenuItem>
                </Menu>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Link className='navbarLink' to='/'>Home</Link>
                </Button>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Link className='navbarLink' to='/contact'>Contact</Link>
                </Button>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Link className='navbarLink' to='/pattern'>Patterns</Link>
                </Button>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Link className='navbarLink' to='/PatternEdit'>Pattern Editor</Link>
                </Button>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
