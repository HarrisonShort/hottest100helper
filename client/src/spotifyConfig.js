const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = process.env.NODE_ENV === 'production' ? 'https://harrisonshort.github.io/hottest100helper/' : "http://localhost:3000/";
const clientId = process.env.NODE_ENV === 'production' ? '19368744a9fa4f93aade08b455163471' : "e46e02da24384042b7a9d4a7cab689df";

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-follow-read',
    'user-top-read',
    'user-library-read',
    'playlist-modify-public'
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;