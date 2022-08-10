import { React, Component, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import './App.css';
import useAuth from "./useAuth";

const spotifyApi = new SpotifyWebApi({
    clientId: 'e46e02da24384042b7a9d4a7cab689df'
});

const UserDetailsComponent = ({ code }) => {
    const [userData, setUserData] = useState();
    const accessToken = useAuth(code);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getMe()
            .then((data) => {
                setUserData(data.body)
            });
    }, [accessToken]);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Logged in {userData ? `as ${userData.display_name}` : ""}
                </p>
                {userData ? <img src={userData.images[0].url} alt="user"></img> : ""}
            </header>
        </div >
    );
};

export default UserDetailsComponent;
