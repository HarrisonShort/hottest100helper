import { React, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../useAuth";
import Header from '../header/Header';
import SpotifyButtonGroup from "./SpotifyButtonGroup";
import SpotifyDataTable from "./SpotifyDataTable.js";
import * as spotifyUtils from "./spotifyUtils";
import Footer from "../footer/Footer";
import * as getFunctions from './spotifyGetFunctions';

const spotifyApi = new SpotifyWebApi({
    clientId: 'e46e02da24384042b7a9d4a7cab689df'
});

export const SpotifyDashboard = ({ code }) => {
    const [userData, setUserData] = useState();
    const [currentTracks, setCurrentTracks] = useState([]);
    const [playlists, setPlaylists] = useState();
    const [warningText, setWarningText] = useState("Please select an option");
    const accessToken = useAuth(code);
    const sortTypes = ["Top Tracks", "Saved Tracks", "Saved Albums"];
    let helperPlaylist = null;

    const fetchUserData = async () => {
        let fetchedUserData = await getFunctions.getUserData(spotifyApi);
        setUserData(fetchedUserData);
    }

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);
        fetchUserData();

    }, [accessToken]);

    const fetchPlaylists = async () => {
        let fetchedPlaylists = await getFunctions.getAllPlaylistsAsync(spotifyApi, userData.id);
        setPlaylists(fetchedPlaylists);
    }

    useEffect(() => {
        if (!accessToken || !userData) {
            return;
        }

        fetchPlaylists();
    }, [userData]);

    useEffect(() => {

    }, [playlists]);

    const handleButtonPress = async (buttonPressed) => {
        setCurrentTracks([]);
        setWarningText("Loading tracks...");

        switch (buttonPressed) {
            case sortTypes[0]:
                setCurrentTracks(await getFunctions.getAllTopTracks(spotifyApi));
                setWarningText("No songs available. This probably means none of your top tracks are from this year!");
                break;
            case sortTypes[1]:
                setCurrentTracks(await getFunctions.getAllSavedTracks(spotifyApi));
                setWarningText("No songs available. This probably means none of your saved tracks are from this year!");
                break;
            case sortTypes[2]:
                setCurrentTracks(await getFunctions.getAllSavedAlbumTracks(spotifyApi));
                setWarningText("No songs available. This probably means none of your saved albums are from this year!");
                break;
            default:
                console.log(`${buttonPressed} not yet implemented`);
                break;
        }
    }

    const handlePlaylistSelect = async (selectedPlaylistId) => {
        if (!selectedPlaylistId) {
            return;
        }

        setCurrentTracks([]);
        setWarningText("Loading tracks...");

        let playlist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

        if (playlist) {
            let tracks = await getFunctions.getAllPlaylistTracks(spotifyApi, selectedPlaylistId);
            console.log(tracks)
            setCurrentTracks(tracks);
        }
    }

    // Show logging in message while we wait for user data to populate.
    // Also wait for playlists to populate.
    if (!userData || !playlists) {
        return <div>Logging in...</div>
    }

    return (
        <div>
            <Header username={userData.display_name} image={userData.images[0].url} />
            <SpotifyButtonGroup types={sortTypes} handleButtonPress={handleButtonPress} playlists={playlists} handlePlaylistSelect={handlePlaylistSelect} />
            <SpotifyDataTable tracks={currentTracks} warningText={warningText} />
            <Footer />
        </div>
    )
}
