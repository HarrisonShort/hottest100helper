const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config({ path: './.env' });

const clientId = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_ID : process.env.DEVELOPMENT_CLIENT_ID;
const clientSecret = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_SECRET : process.env.DEVELOPMENT_CLIENT_SECRET;
const redirectUri = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_REDIRECT_URI : process.env.DEVELOPMENT_REDIRECT_URI;

const login = (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri
    });

    const code = req.body.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiredIn: data.body.expires_in
            });
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
}

const refresh = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
        refreshToken: refreshToken
    });

    spotifyApi.refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            });
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
}

module.exports = {
    login,
    refresh
};