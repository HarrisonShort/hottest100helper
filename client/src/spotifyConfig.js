const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "e46e02da24384042b7a9d4a7cab689df";

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-follow-read',
    'user-top-read',
    'user-library-read',
    'playlist-modify-public'];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;