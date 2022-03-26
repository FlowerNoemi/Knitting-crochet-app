import React from 'react';
import './pattern.css';
import { useState } from 'react';
import { Button } from '@mui/material';
import axios from "axios";





const Pattern = () => {
    const [patterns, setPatterns] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState({});


    const patternsPDF = async (id) => {
        axios(`http://localhost:8080/api/v1/pattern/${id}` , {
           method: "GET",
           responseType: "blob"
         })
           .then((response) => {
             const file = new Blob([response.data], {
               type: "application/pdf"
             });
             const fileURL = URL.createObjectURL(file); 
             window.open(fileURL);
             console.log('cica')
         })
       
       .catch(error => {
         console.log(error);
       });
   };
   
    return (
        <div className='box'>
        <h1>Pattern</h1>
        <Button onClick={patternsPDF}>cicafej</Button>
        </div>
    );
};


export default Pattern;