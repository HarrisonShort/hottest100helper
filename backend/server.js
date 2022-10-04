const spotifyEndpoint = require('./spotifyEndpoints.js');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/check-backend', (request, response) => {
    response.send({ express: 'Your express backend is connected to React.' });
});

app.post('/spotify-login', (req, res) => {
    spotifyEndpoint.login(req, res);
});

app.post('/refresh', (req, res) => {
    spotifyEndpoint.refresh(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));