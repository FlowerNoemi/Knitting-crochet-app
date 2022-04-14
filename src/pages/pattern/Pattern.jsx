import React, { useState , useEffect} from 'react';
import './pattern.css';
import ImgMediaCard from '../../components/CardElement';
import { Box } from '@mui/system';
import {getAllPatterns} from '../../components/httpsreq/patterns';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import axios from "axios";

const Pattern = () => {
    const [patterns, setPatterns] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [craftSelect, setCraftSelect] = useState('Knitting')


    const loadPatterns = async ()  => {
    try {
      const patternsRequest = await  getAllPatterns();
      setPatterns(patternsRequest);
    
    } catch(e) {
      console.log('hiba volt : ', e);
    }
    };


    useEffect(() => {
            loadPatterns();
            setLoading(true);
        } , []
    );

    
    const getCraftSearch = async (searchValue) => {
           await axios.get(`http://localhost:8080/api/v1/pattern/patterns/${searchValue}`)
            .then((res)=> {console.log(res.status); 
            setPatterns(res.data)
            })
            .catch((error) => {
                console.log('error msg', error);
            });  
    }
        

    const craftSearch = (e) => {
        const searchValue = e.target.value;
        if(searchValue === 'All Patterns') {
            setCraftSelect('Knitting')
            loadPatterns();
            setLoading(true);
        } else if(searchValue === 'Knitting') {
            setCraftSelect('Crochet')
            setLoading(true);
            getCraftSearch(searchValue);
        } else if(searchValue === 'Crochet') {
            setCraftSelect('All Patterns')
            setLoading(true);
            getCraftSearch(searchValue);
        }
    }

    return (
        <div>
            <div className='patternCardContainer'>
             <Button 
                    variant='contained' sx={{m: 1 }}
                    onClick={(e) => craftSearch(e)} 
                    className='dataformpageButton'
                    value={craftSelect}
                    >
                    {craftSelect}
            </Button>
            </div>
            {loading &&
            <Container  maxWidth='xxl'
            sx={{mb:5}}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        mx:'auto',
                        px:1,
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