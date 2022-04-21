import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import './Dataform.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const EditPattern = ({name, craft, difficulty, hookSize,url, patternID}) => {
    const [data, setData] = useState({
      name:'',
      craft:'',
      difficulty:'',
      hookSize:'',
      url:'',
    });

	

	const headers = {
		'Content-Type': 'application/json',
	};

	
    const handleChange = (e) => {
			const value = e.target.value;
			setData({
			  ...data,
			  [e.target.name]: value
			});
			
    };



    const handleSubmit = async (e, {patternID}) => {    
		console.log({patternID})
        e.preventDefault();
      const formData = {
        name: data.name || name,
        craft: data.craft || craft,
        difficulty: data.difficulty || difficulty,
        hookSize: data.hookSize || hookSize,
        url: data.url || url,
		
      };
	  
        await axios.put(`http://localhost:8080/api/v1/pattern/patterns/${patternID}`, formData, {
			headers:headers
		})
		.then((response) => {
        console.log(response.status);
		  	if (response.status === 200) {
				console.log(response.data)
			  	};
        }).catch((error) => {
			console.log('error msg', error);
		});  
		
    };    
   
    return (
        <Box
            component='form'
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete='off'
            onSubmit={(e) =>  handleSubmit(e, {patternID}) } 

        > 
                <div>
                    <TextField
                    id='name'
                    name='name'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.name}
					placeholder={name}
                    onChange={(e) => handleChange(e) }
                    />
                </div>
				<div>
					<FormControl sx={{ m: 1,  width: '25ch' }}>
					<InputLabel id="demo-simple-select-helper-label">{craft}</InputLabel>
							<Select
								labelId='demo-simple-select-helper-label'
								id='demo-simple-select-helper'
								label={craft}
								value={data.craft}
								name='craft'
								onChange={(e) => handleChange(e)}
							>
								<MenuItem value={'Knitting'}>Knitting</MenuItem>
								<MenuItem value={'Crochet'}>Crochet</MenuItem>
							</Select>
					</FormControl>
				</div>
						<div>
					<FormControl sx={{ m: 1,  width: '25ch' }}>
						<InputLabel id='demo-simple-select-helper-label'>{difficulty}</InputLabel>
							<Select
								labelId='demo-simple-select-helper-label'
								id='demo-simple-select-helper'
								value={data.difficulty}
								label={difficulty}
								name='difficulty'
								onChange={(e) => handleChange(e)}

							>
								<MenuItem value={'easy'}>easy</MenuItem>
								<MenuItem value={'medium'}>medium</MenuItem>
								<MenuItem value={'difficult'}>difficult</MenuItem>
							</Select>
					</FormControl>
					  </div>
                <div>
					<TextField
						id='hookSize'
						name='hookSize'
						type='text'
						multiline
						maxRows={4}
						value={data.hookSize}
						placeholder={hookSize}
						onChange={(e) => handleChange(e)}
						/>
                </div>
                <div>
					<TextField
						id='url'
						name='url'
						type='text'
						multiline
						maxRows={4}
						value={data.url}
						placeholder={url}
						onChange={(e) => handleChange(e)}

						/>
                </div>
                <div className='dataFormPageBtnBlock'>
					<Button 
						type='submit'
						onClick={(e) =>  handleSubmit(e, {patternID})} 
						variant='contained' sx={{m: 1 }} 
						className='dataformpageButton'

						>
						Change Pattern
					</Button> 
				</div>
        </Box>
  );
}

export default EditPattern;