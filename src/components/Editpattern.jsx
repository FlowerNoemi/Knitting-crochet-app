import React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import './dataform.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const EditPattern = ({name, craft, difficulty, hookSize,url, value }) => {
	const [disabled, setDisabled] = useState(true);
	const [inputClick , setInputClick] = useState(false)
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
		setInputClick(true)
		console.log(e.target.value)
		const value = e.target.value;
		console.log(value)
		setData({
		  ...data,
		  [e.target.name]: value
		});

    };

/*	const CheckData = (e) => {
		const craftData = data.craft;
		const nameData = data.name;
		const hookSizeData = data.hookSize;
		const urlData = data.url;

		if(nameData.length !== 0 && craftData.length !== 0 && hookSizeData.length !== 0 && urlData.length !== 0 ) {
			 setDisabled(false)
		}
		if(craftData === '' || nameData.length === 0 || hookSizeData.length === 0 || urlData.length === 0) {
			setDisabled(true)
		}
	}; 

	useEffect(() => {
		CheckData();
	});*/

    const handleSubmit = async (e, id) => {    
		
        e.preventDefault();
      const formData = {
        name: data.name,
        craft: data.craft,
        difficulty: data.difficulty,
        hookSize: data.hookSize,
        url: data.url,
		
      };
	  
        await axios.put(`http://localhost:8080/api/v1/pattern/patterns/:${id}`, formData, {
			headers:headers
		})
		.then((response) => {
        console.log(response.status);
		  	if (response.status === 200) {
				setData({
					name:'',
					craft:'',
					difficulty:'',
					hookSize:'',
					url:'',
			  	});
			}
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
            onSubmit={(e) =>  handleSubmit(e) } 
        > 
                <div>
                    <TextField
                    id='name'
                    label='Name'
                    name='name'
                    type='text'
                    multiline
                    maxRows={4}
                    value={data.name}
					placeholder={name}
                    onClick={(e) => handleChange(e) }
			
                    />
                </div>
				<div>
					<FormControl sx={{ m: 1,  width: '25ch' }}>
						<InputLabel id='demo-simple-select-helper-label'>Craft</InputLabel>
							<Select
								labelId='demo-simple-select-helper-label'
								id='demo-simple-select-helper'
								value={data.craft}
								label='Craft'
								name='craft'
								onChange={(e) => handleChange(e)}
			
							>
								<MenuItem value=''>
									None
								</MenuItem>
								<MenuItem value={'Knitting'}>Knitting</MenuItem>
								<MenuItem value={'Crochet'}>Crochet</MenuItem>
							</Select>
					</FormControl>
				</div>
						<div>
					<FormControl sx={{ m: 1,  width: '25ch' }}>
						<InputLabel id='demo-simple-select-helper-label'>Difficulty</InputLabel>
							<Select
								labelId='demo-simple-select-helper-label'
								id='demo-simple-select-helper'
								value={data.difficulty}
								label='Difficulty'
								name='difficulty'
								onChange={(e) => handleChange(e)}

							>
								<MenuItem value=''>
									None
								</MenuItem>
								<MenuItem value={'easy'}>easy</MenuItem>
								<MenuItem value={'medium'}>medium</MenuItem>
								<MenuItem value={'difficult'}>difficult</MenuItem>
							</Select>
					</FormControl>
					  </div>
                <div>
					<TextField
						id='hookSize'
						label='HookSize'
						name='hookSize'
						type='number'
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
						label='Image URL'
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
						onClick={(e) =>  handleSubmit(e)} 
						disabled={disabled && disabled} 
						variant='contained' sx={{m: 1 }} 
						className='dataformpageButton'

						>
						New Pattern
					</Button> 
				</div>
        </Box>
  );
}

export default EditPattern;