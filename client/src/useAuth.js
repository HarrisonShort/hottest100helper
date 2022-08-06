import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "e46e02da24384042b7a9d4a7cab689df"
});

export default function useAuth(code) {
    const [spotifyWebApi, setSpotifyWebApi] = useState();

    useEffect(() => {
        axios
            .post("http://localhost:5000/spotify-login", { code })
            .then((response) => {

                spotifyApi.setAccessToken(response.data.accessToken);
                spotifyApi.setRefreshToken(response.data.refreshToken);

                setSpotifyWebApi(spotifyApi);
                window.history.pushState({}, null, "/");
            })
            .catch(() => {
                //window.location = "/";
            });
    }, [code]);

    return spotifyWebApi
}