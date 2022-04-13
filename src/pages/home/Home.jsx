import React from 'react';
import './home.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';




const Home = () => {
    return (
        <div className='container'>
            <h3 className='title'>Knitting and Crochet</h3>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} className='stackBtn'>
            <Button className='largebtn'>
                <Link className='largelink' to='/pattern'>Search all Patterns</Link>
            </Button>
            <Button className='largebtn'>
                <Link className='largelink' to='/contact'>Contact Us</Link>
            </Button>
            </Stack>
        </div>
    );
};


export default Home;
