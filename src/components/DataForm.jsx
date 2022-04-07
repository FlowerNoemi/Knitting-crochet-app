import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

const MultilineTextFields = () => {
    const [value, setValue] = React.useState('');
    const [inputName, setInputName] =  useState('');
    const [inputCraft, setInputCraft] =  useState('');
    const [inputdifficultt, setInputdifficult] =  useState('');
    const [inputhookSize, setInputHookSize] =  useState('');
    const [inputURL, setInputURL] =  useState('');
    const [inputpatternPdf, setInputpatternPdf] =  useState('');
    const [newPatternChange, setnewPatternChange] = useState(false);

    const formData =[       
      {name:'',
      craft:'',
      difficulty:'',
      hookSize:'',
      url:'',
      patternPDF:'',
    }
    ];

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const onClickpatternSubmit = async () => {   
      console.log(formData)
        // make axios post request
        await axios.post('http://localhost:8080/api/v1/pattern/patterns',{
          data: formData,
        })
          setnewPatternChange(false);
          console.log(inputName)
      }    

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <form>
                <div>
                    <TextField
                    id="outlined-multiline-flexible"
                    label={setInputName}
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={handleChange}
                    />
                </div>
            </form>
            <Button type='submit' onClick={onClickpatternSubmit}>Pattern Create</Button>
        </Box>
  );
}

export default MultilineTextFields;
