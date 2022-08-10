const SpotifyWebApi = require('spotify-web-api-node');

const credentials = {
    clientId: 'e46e02da24384042b7a9d4a7cab689df',
    clientSecret: '3a45111efb444494b7b66f16a0259ddd',
    redirectUri: 'http://localhost:3000/'
}

const login = (req, res) => {
    let spotifyApi = new SpotifyWebApi(credentials);
    const code = req.body.code;

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
}

module.exports = {
    login
};