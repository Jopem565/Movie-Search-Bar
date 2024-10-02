const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.port || 5000;

const apiKey = 'ef513633'; 

console.log(apiKey);

app.use(cors());
app.use(express.json());

//Route to fetch movies from the API
app.get('/api/movies', async (req, res) => {
    console.log("Request received");
    const searchQuery = req.query.q;
    console.log(searchQuery);
    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`);
        res.json(response.data);
        console.log("API Response:  ", response.data);
    } 
    catch (error) {
        console.error('Error fetching data from OMDb API:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});