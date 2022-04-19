import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './contactForm.css';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const ContactForm = () =>{
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState({
        name:'',
        mail:'',
        message:'',
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

    const CheckData = (e) => {
        const EmailRegex=/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

		const nameData = data.name;
        const mailData = data.mail;
        const messageData = data.message;

		
		if(nameData.length !== 0 || mailData.length !== 0 || messageData.length !== 0)   {
			setDisabled(false)
		}


		if( nameData.length === 0 || mailData.length === 0 || messageData.length === 0 )   {
			setDisabled(true)

		}
        if(!EmailRegex.test(mailData)) {
            setDisabled(true)
        }

        
	};

	useEffect(() => {
		CheckData();
	});

    const handleSubmit = async (e) => {    
		
        e.preventDefault();
      const formData = {
        name: data.name,
        craft: data.mail,
        difficulty: data.message

		
      };
	  
        await axios.post('http://localhost:8080/api/v1/message', formData, {
			headers:headers
		})
		.then((response) => {
        console.log(response.status);
		  	if (response.status === 200) {
                console.log(response.data);
			}
        }).catch((error) => {
			console.log('error msg', error);
		});  
		
    };   




  return (
      <div className='contactFormCard'>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, minWidth: '90%' } , 
      }}
      spacing={{ xs: 1, sm: 2, md: 6 }}
      noValidate
      autoComplete="off"
      onSubmit={(e) =>  handleSubmit(e) }
    >
         <TextField
            id="outlined-multiline-flexible"
            label="Name"
            name='name'
            multiline
            maxRows={6}
            value={data.name}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) =>  CheckData(e)}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="E-mail"
            name='mail'
            multiline
            maxRows={6}
            value={data.mail}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) =>  CheckData(e)}
        />
        <TextField
            className='textAreaBoxinput'
            
            id="outlined-multiline-flexible"
            label="Message"
            name='message'
            multiline
            minRows={6}
            value={data.message}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) =>  CheckData(e)}
        />
        <div className='dataFormContactBtnBlock'>
             <Button 
                type='submit'
                onClick={(e) =>  handleSubmit(e)} 
                disabled={disabled && disabled} 
                variant='contained' sx={{m: 1 }} 
                className='dataformpageButtonCont'
                endIcon={<SendIcon />}>
                    Send
            </Button> 
        </div>
    </Box>
    </div>
  );
}

export default ContactForm;