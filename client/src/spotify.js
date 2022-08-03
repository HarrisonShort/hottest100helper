import querystring from 'querystring';

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirect_uri = "http://localhost:8888/callback";

const client_id = 'e46e02da24384042b7a9d4a7cab689df'; // Your client id
const client_secret = '3a45111efb444494b7b66f16a0259ddd'; // Your secret
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

export const loginUrl = `${authEndpoint}?` +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
    });

export const getTokenFromUrl = () => {
    return window.location.hash
}