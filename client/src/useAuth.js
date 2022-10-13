import { useEffect, useState } from "react";
import axios from "axios";

const endpointURL = process.env.NODE_ENV === 'production' ? "https://hottest100helper-server.azurewebsites.net" : "http://localhost:5000/spotify-login";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios
            .post(endpointURL, { code })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);

                // Go to root, which should load logged in UI.
                window.history.pushState({}, null, "/");
            })
            .catch((error) => {
                console.log(error);
                window.location = "/";
            });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        const interval = setInterval(() => {
            axios
                .post(endpointURL, {
                    refreshToken
                })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch((error) => {
                    console.log(error);
                    window.localStorage = "/";
                })
        }, (expiresIn - 60) * 1000); // Refresh the token in 59 minutes.

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}