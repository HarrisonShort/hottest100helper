import { React, Component, useEffect, useState } from "react";
import './App.css';
import useAuth from "./useAuth";

const UserDetailsComponent = ({ code }) => {
    const [userData, setUserData] = useState();
    const spotifyApi = useAuth(code);

    useEffect(() => {
        if (!spotifyApi) {
            return;
        }

        spotifyApi.getMe()
            .then((data) => {
                setUserData(data.body)
                console.log(data.body);
            })
    }, [spotifyApi]);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Logged in {userData ? `as ${userData.display_name}` : ""}
                </p>
                {userData ? <img src={userData.images[0].url}></img> : ""}
            </header>
        </div >
    );
};

export default UserDetailsComponent;
