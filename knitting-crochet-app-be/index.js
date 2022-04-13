const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());

const appPort = 8080;

const patterns = [
    {
        id: 1,
        name: 'Easy Diagonal Shawl Free Knitting Pattern',
        craft: 'Knitting',
        difficulty: 'easy',
        hookSize: 8,
        url: 'https://images4-g.ravelrycache.com/uploads/NobleKnits/610517754/diagonalshawl_medium2.jpeg',
        
    },
    {
        id: 2,
        name: 'Crochet Christmas gnome ornament',
        craft: 'Crochet',
        difficulty: 'easy',
        hookSize: 1.75,
        url: 'https://1.bp.blogspot.com/-oVb2rE7YCSc/Xful7-hPfqI/AAAAAAAACYY/GPfupYpV2pQS2FNP2sVfzklR6yrfjl3bwCLcBGAsYHQ/s1600/christmas-gnome-ornament.jpg',
        
    },
    {
        id: 3,
        name: 'Dumpling Kitty',
        craft: 'Crochet',
        difficulty: 'medium',
        hookSize: 3.25,
        url: 'https://www.amigurumi.com/images/amigurumi-159Dumpling-Kitty.jpeg',
        
    },
    {
        id: 4,
        name: 'Baby Disney',
        craft: 'Crochet',
        difficulty: 'difficult',
        hookSize: 2,
        url: 'https://www.suenhosblanditos.com/wp-content/uploads/2018/03/disney-amigurumi-crochet-patterns.jpg',
        
    },
    {
        id: 5,
        name: 'Segel',
        craft: 'Knitting',
        difficulty: 'easy',
        hookSize: 3,
        url: 'http://www.meermaedchen.com/wp-content/uploads/2014/10/IMG_0325.jpg',
        
    },
    {
        id: 6,
        name: 'By the Bay Backpack',
        craft: 'Crochet',
        difficulty: 'medium',
        hookSize: 3.75,
        url: 'https://i.pinimg.com/564x/b2/49/9d/b2499d4c3e626b9da688bc24693f6e38.jpg',
        
    },

]


app.get('/api/v1/pattern/port', (req, res) => {
    res.send(`The app is running on this port: ${appPort}!`)
});


app.get('/api/v1/pattern/patterndata', (req, res) => {
   res.status(200).send(patterns);
});


app.delete('/api/v1/pattern/patterndelete/:id', (req, res) => {
    checkDetailsOfRequest({ req, res });
    const index = getPatterns({ id: req.params.id });
    patterns.splice(index, 1);
    res.status(200).send('The deletion of the animal was successfully');
 });

app.post('/api/v1/pattern/patterns', (req, res) => {
    checkDetailsOfRequest({ req, res })
        patterns.push({
        ...req.body,
        id: patterns.length + 1
    })
    res.status(200).send('The Pattern creation was successfully!');

})

app.put('/api/v1/pattern/patterns/:id', (req, res) => {
    checkDetailsOfRequest({ req, res });
   
    const index = getPatterns({ id: req.params.id });
    
    patterns[index] = {
        ...animals[index],
        ...req.body,
    };
    res.status(200).send('The update was successfully!',);
});

app.get('/api/v1/pattern/patterns/search', (req, res) => {
    const queryKey = Object.keys(req.query);
    checkDetailsOfRequest({ req, res });
    !isSearchKeyCorrect({ searchKey: queryKey}) && res.status(400).send("The search with the given key cannot be proceed!");
    const searchResult = patterns.find((pattern) => pattern.craft === Object.values(req.query));
    res.status(200).send(searchResult);
});




function getPatterns({ id }) {
    const pattern = patterns.find((pattern) => pattern.id === parseInt(id));
    return patterns.indexOf(pattern);
}

function checkDetailsOfRequest({ req, res }) {
    if (req.body?.craft) { 
        const craftError =  isCraftValueCorrect({ craft: req.body.craft });
        !craftError && res.status(400).send("The patterns craft property can only be [Knitting, Crochet]");
    }
    if (req.params?.id) { 
        const idNotFoundError = isElementWithGivenIdExist({ id: req.params.id });  
        !idNotFoundError && res.status(404).send("Pattern with the given id was not found");
        
    }
}



function isElementWithGivenIdExist({ id }) { 
    return patterns.find((pattern) => pattern.id === parseInt(id));
}

function isCraftValueCorrect({ craft }) { 
    const rightValues = ['Knitting', 'Crochet'];
    return rightValues.includes(craft);
}

function isSearchKeyCorrect( { searchKey }) { 
    const correctValue = "craft";
    return correctValue === searchKey;
}


app.listen(appPort, () => console.log(`app is listening on ${appPort}-port`));
