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
    const [warningText, setWarningText] = useState("Please select an option");
    const accessToken = useAuth(code);
    const sortTypes = ["Top Tracks", "Saved Tracks", "Saved Albums", "In Playlists"];

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
                setCurrentTracks(spotifyUtils.formatTracks(data.body.items));
                setWarningText("No songs available. This probably means none of your top tracks are from this year!")
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
                setCurrentTracks(spotifyUtils.formatTracks(tracks));
                setWarningText("No songs available. This probably means none of your saved tracks are from this year!")
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getSavedAlbumTracks = () => {
        spotifyApi.getMySavedAlbums({
            limit: 50
        })
            .then((data) => {
                console.log(data.body.items)
                let albumTracks = [];
                data.body.items.forEach(item => {
                    item.album.tracks.items.forEach(track => albumTracks.push({ track: track, album: item.album }));
                });
                setCurrentTracks(spotifyUtils.formatAlbumTracks(albumTracks));
                setWarningText("No songs available. This probably means none of your saved albums are from this year!")
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getPlaylists = () => {
        let savedTracksCollated = [];
        spotifyApi.getUserPlaylists()
            .then((data) => {
                console.log(data.body);
                setWarningText("No songs available. This probably means none of your saved tracks are from this year!")
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
            case sortTypes[2]:
                getSavedAlbumTracks();
                break;
            case sortTypes[3]:
                getPlaylists();
                break;
            default:
                console.log(`${buttonPressed} not yet implemented`);
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
            <SpotifyDataTable tracks={currentTracks} warningText={warningText} />
        </div>
    )
}