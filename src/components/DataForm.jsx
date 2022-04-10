import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import './dataform.css';

const MultilineTextFields = () => {
    const [isShown, setIsShown] = useState(false);



    const [data, setData] = useState({
      name:'',
      craft:'',
      difficulty:'',
      hookSize:'',
      url:'',
      selectedFile: null,
      patternPDF:'',
    });

 

    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
    };


    const handleSubmit = async (e) => { 
      e.preventDefault();
      const formData = {
        name: data.name,
        craft: data.craft,
        difficulty: data.difficulty,
        hookSize: data.hookSize,
        url: data.url,
        selectedFile: data.selectedFile,
        patternPDF: data.patternPDF,

      };
        await axios.post('http://localhost:8080/api/v1/pattern/patterns', formData).then((response) => {
          console.log(response.status);
        })  
    }    
   
    return (
        <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        > 
            <form onSubmit={(e) => handleSubmit(e)}  >
                <div>
                    <TextField
                    id='name'
                    label='Name'
                    name='name'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                    id="craft"
                    label='Craft'
                    name='craft'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.craft}
                    onChange={handleChange}
                    />
                </div>
                <div>
                <TextField
                    id="difficulty"
                    label='Difficulty'
                    name='difficulty'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.difficulty}
                    onChange={handleChange}
                    />
                </div>
                <div>
                <TextField
                    id="hookSize"
                    label='HookSize'
                    name='hookSize'
                    type='number'
                    multiline
                    maxRows={4}
                    value={data.hookSize}
                    onChange={handleChange}
                    />
                </div>
                <div>
                <TextField
                    id="url"
                    label='Image URL'
                    name='url'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.url}
                    onChange={handleChange}
                    />
                </div>
                <div>
                <TextField
                    id="patternPDF"
                    label='Pattern URL'
                    name='patternPDF'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.patternPDF}
                    onChange={handleChange}
                    />
                </div>
                <Button type='submit' onClick={handleSubmit} >New Pattern</Button> 
                <Button type='submit' value={isShown} onClick={(e) => setIsShown(e)} >End of intake</Button> 
            </form>
            
        </Box>
  );
}

export default MultilineTextFields;
