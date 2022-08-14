import { React, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../useAuth";
import Header from '../Header';
import SpotifyButtonGroup from "./SpotifyButtonGroup";
import SpotifyDataTable from "./SpotifyDataTable.js";
import * as spotifyUtils from "./spotifyUtils";

const spotifyApi = new SpotifyWebApi({
    clientId: 'e46e02da24384042b7a9d4a7cab689df'
});

export const SpotifyDashboard = ({ code }) => {
    const [userData, setUserData] = useState();
    const [currentTracks, setCurrentTracks] = useState([]);
    const accessToken = useAuth(code);
    const sortTypes = ["Top Tracks", "Saved Tracks", "Saved Albums"];

    const getUserData = () => {
        spotifyApi.getMe()
            .then((data) => {
                setUserData(data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getTopTracks = () => {
        spotifyApi.getMyTopTracks({
            limit: 50
        })
            .then((data) => {
                setCurrentTracks(spotifyUtils.formatTracks(data.body.items))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getSavedTracks = () => {
        let savedTracksCollated = [];
        spotifyApi.getMySavedTracks({
            limit: 50
        })
            .then((data) => {
                let tracks = [];
                data.body.items.forEach(track => tracks.push(track.track));
                setCurrentTracks(spotifyUtils.formatTracks(tracks))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleButtonPress = (buttonPressed) => {
        switch (buttonPressed) {
            case sortTypes[0]:
                getTopTracks();
                break;
            case sortTypes[1]:
                getSavedTracks();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);
        getUserData();

    }, [accessToken]);

    // Show logging in message while we wait for user data to populate.
    if (!userData) {
        return <div>Logging in...</div>
    }

    return (
        <div>
            <Header username={userData.display_name} image={userData.images[0].url} />
            <SpotifyButtonGroup types={sortTypes} handleButtonPress={handleButtonPress} />
            <SpotifyDataTable tracks={currentTracks} />
        </div>
    )
}
