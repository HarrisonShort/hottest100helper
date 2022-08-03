import querystring from 'querystring';
import request from 'request';

const redirect_uri = "http://localhost:5000/spotify-callback";
const stateKey = 'spotify_auth_state';

const client_id = 'e46e02da24384042b7a9d4a7cab689df';
const client_secret = '3a45111efb444494b7b66f16a0259ddd';
const scope = 'user-read-private ' +
    'user-read-email  ' +
    'user-follow-read  ' +
    'user-top-read  ' +
    'user-library-read  ' +
    'user-modify-playback-state  ' +
    'user-read-playback-state  ' +
    'user-read-currently-playing ' +
    'user-read-recently-played ' +
    'user-read-playback-position ' +
    'streaming';

let access_token = '';
let refresh_token = '';
let user_details = {};

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const login = (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
}

export const loginCallback = (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        // res.redirect('/#' +
        //     querystring.stringify({
        //         error: 'state_mismatch'
        //     }));
        console.log("login failed! state === null || state !== storedState");
        //res.redirect('http://localhost:3000');
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                access_token = body.access_token;
                refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    user_details = body;
                    console.log(user_details);
                });

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/#' +
                //     querystring.stringify({
                //         access_token: access_token,
                //         refresh_token: refresh_token
                //     }));
                res.redirect('http://localhost:3000/logged-in');
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
}

export const getUserDetails = (req, res) => {
    res.send(user_details);
};