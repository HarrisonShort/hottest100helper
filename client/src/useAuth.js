import { useEffect, useState } from "react";
import axios from "axios";

const loginEndpoint = process.env.NODE_ENV === 'production' ? "https://hottest100helper-server.azurewebsites.net/spotify-login" : "http://localhost:5000/spotify-login";
const refreshEndpoint = process.env.NODE_ENV === 'production' ? "https://hottest100helper-server.azurewebsites.net/refresh" : "http://localhost:5000/refresh";
const redirectLocation = process.env.NODE_ENV === 'production' ? "/hottest100helper/" : "/";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios
            .post(loginEndpoint, { code })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);

                // Go to root, which should load logged in UI.
                window.history.pushState({}, null, redirectLocation);
            })
            .catch((error) => {
                console.log(error);
                window.location = redirectLocation;
            });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        const interval = setInterval(() => {
            axios
                .post(refreshEndpoint, {
                    refreshToken
                })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch((error) => {
                    console.log(error);
                    window.localStorage = redirectLocation;
                })
        }, (expiresIn - 60) * 1000); // Refresh the token in 59 minutes.

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}