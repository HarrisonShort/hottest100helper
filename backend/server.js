import * as spotify from './spotify.js';
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
    .use(cookieparser());

app.get('/check-backend', (request, response) => {
    response.send({ express: 'Your express backend is connected to React.' });
});

app.get('/spotify-login', (request, response) => spotify.login(request, response));

app.get('/spotify-callback', (request, response) => spotify.loginCallback(request, response));

app.get('/spotify-user-details', (request, response) => spotify.getUserDetails(request, response));

app.listen(port, () => console.log(`Listening on port ${port}`));