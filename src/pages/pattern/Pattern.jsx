import React, { useEffect, useState } from 'react';
import './pattern.css';
import ImgMediaCard from '../../components/CardElement';
import { Box } from '@mui/system';
import {getAllPatterns} from '../../components/httpsreq/patterns';
import Container from '@mui/material/Container';

const Pattern = () => {
    const [patterns, setPatterns] = useState(['']);
    const [loading, setLoading] = useState(false);


    const loadPatterns = async ()  => {
    try {
      const patternsRequest = await  getAllPatterns();
      setPatterns(patternsRequest);
    
    } catch(e) {
      console.log('hiba volt : ', e);
    }
    };
  
     useEffect(() => {
        let timer = setTimeout(() => {
        loadPatterns();
        setLoading(true);
    }, 1500)

    return () => { clearTimeout(timer)
    }
    }, [patterns]);


    



    return (
        <div>
            {!loading && 
            <p>Loading...</p>
            }
            {loading &&
            <Container  maxWidth='xxl'>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        mx:'auto',
                        px:2,
                        bgcolor: 'background.paper',
                        borderRadius: 3
                    }}
                    >
                    {patterns.map((pattern, id)=> {
                    return(
                    <ImgMediaCard key = {id} {...pattern}/>
                    )})}
                </Box>
            </Container>} 
        </div>
    )
};


export default Pattern;