import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios
            .post("http://localhost:5000/spotify-login", { code })
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

    return accessToken;
}