import * as React from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CallIcon from '@mui/icons-material/Call';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ContactForm from '../../components/ContactForm';
import './contact.css';


const Contact = () => {
    
  return (
    <div className='containerContact'>
        <h3 className='title'>Contact us</h3>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 6 }}>
            <List sx={{ width: '100%', maxWidth: 390, bgcolor: '#dbd4d7e0', paddingY:'50px'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CallIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Give us a call" secondary="+36307094447" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ContactMailIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Send us an email" secondary="testmail@gmail.com" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AddLocationIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Come see us" secondary="4002, Debrecen Diószegi út 10" />
                    </ListItem>
                </List>
                <ContactForm></ContactForm>
        </Stack>  

    </div>
  );
}

export default Contact;