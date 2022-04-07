import axios from "axios";


export const getAllPatterns = async () => {  
    const patternData = await axios.get('http://localhost:8080/api/v1/pattern/patterndata')
    .then((res)=>res.data);
    return patternData; 
};

