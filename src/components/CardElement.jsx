import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './card.css';

const ImgMediaCard = ({ name, id, craft, difficulty, hookSize, url, patternPDF}) => {

    return (
        <Card 
            sx={{ maxWidth: 280 , m:1, width:280, borderRadius: 3}} 
            key={id} 
            className='cardBox'
        > 
            <CardMedia
                component="img"
                alt={name}
                height={200}
                width={200}
                image={url}
                key={url}
                sx={{borderRadius: 3 , pt:1}}
            />
            <Stack direction="row" spacing={1} marginTop={2} className='craftBox'>
            <Chip label={craft} color="success" key={craft} className='craftLabel' />
            </Stack>
            <CardContent>
            <Typography 
                gutterBottom variant="h5"
                component="div" 
                value={name} 
                sx={{ mt: 2}}
                key={name}
                height={60}
                marginBottom={3} 
            >
                {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" minHeight={25} marginTop={2} key={hookSize}>
                Hook Size: {hookSize} 
            </Typography>
            <Typography variant="body2" color="text.secondary" minHeight={25} key={difficulty} >
                Difficulty: {difficulty} 
            </Typography>
            </CardContent>
        </Card>
    );
}

export default ImgMediaCard;