const spotify = require('./spotifyEndpoints.js');
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/check-backend', (request, response) => {
    response.send({ express: 'Your express backend is connected to React.' });
});

const credentials = {
    clientId: 'e46e02da24384042b7a9d4a7cab689df',
    clientSecret: '3a45111efb444494b7b66f16a0259ddd',
    redirectUri: 'http://localhost:3000/'
}

app.post('/spotify-login', (req, res) => {
    let spotifyApi = new SpotifyWebApi(credentials);

    const code = req.body.code;

    console.log(code);

    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token
            });
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
});

//app.get('/spotify-callback', (request, response) => spotify.loginCallback(request, response));

//app.get('/spotify-user-details', (request, response) => spotify.getUserDetails(request, response));

app.listen(port, () => console.log(`Listening on port ${port}`));