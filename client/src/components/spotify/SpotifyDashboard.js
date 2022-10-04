import { React, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../useAuth";

import Header from '../header/Header';
import SpotifyButtonGroup from "./SpotifyButtonGroup";
import SpotifyDataTable from "./SpotifyDataTable.js";
import Footer from "../footer/Footer";

import * as spotifyUtils from "./helpers/spotifyUtils";
import * as getFunctions from './helpers/spotifyGetFunctions';
import * as playlistFunctions from './helpers/spotifyPlaylistFunctions';

const spotifyApi = new SpotifyWebApi({
    clientId: 'e46e02da24384042b7a9d4a7cab689df'
});

export const SpotifyDashboard = ({ code }) => {
    const [userData, setUserData] = useState();
    const [currentTracks, setCurrentTracks] = useState([]);
    const [playlists, setPlaylists] = useState();
    const [warningText, setWarningText] = useState("Please select an option");
    const [helperShortlist, setHelperShortlist] = useState();
    const accessToken = useAuth(code);
    const sortTypes = ["Top Tracks", "Saved Tracks", "Saved Albums"];

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

    useEffect(() => {
        if (!userData) {
            return;
        }

        const fetchPlaylists = async () => {
            let fetchedPlaylists = await getFunctions.getAllPlaylistsAsync(spotifyApi, userData.id);
            let shortlist = fetchedPlaylists.find((playlist) => playlist.name === "Hottest 100 Helper Shortlist");

            if (shortlist) {
                fetchedPlaylists = playlistFunctions.separateHelperShortlist(fetchedPlaylists, shortlist)
                shortlist = await playlistFunctions.getHelperShortlistTracks(spotifyApi, shortlist);

                setHelperShortlist(shortlist);
            }

            setPlaylists(fetchedPlaylists);
        }

        fetchPlaylists();
    }, [userData]);

    const handleButtonPress = async (buttonPressed) => {
        setCurrentTracks([]);
        setWarningText("Loading tracks...");

        switch (buttonPressed) {
            case sortTypes[0]:
                applyButtonPressTracks(await getFunctions.getAllTopTracks(spotifyApi), "No songs available. This probably means none of your top tracks are from this year!");
                break;
            case sortTypes[1]:
                applyButtonPressTracks(await getFunctions.getAllSavedTracks(spotifyApi), "No songs available. This probably means none of your saved tracks are from this year!");
                break;
            case sortTypes[2]:
                applyButtonPressTracks(await getFunctions.getAllSavedAlbumTracks(spotifyApi), "No songs available. This probably means none of your saved albums are from this year!");
                break;
            case "shortlist":
                setCurrentTracks(helperShortlist.tracks);
                setWarningText("There are no tracks in your shortlist!");
                break;
            default:
                console.log(`${buttonPressed} not yet implemented`);
                break;
        }
    }

    const applyButtonPressTracks = (tracks, textForWarning) => {
        if (helperShortlist.tracks.length > 0) {
            tracks = spotifyUtils.findTracksInShortlist(tracks, helperShortlist.tracks);
        }

        setCurrentTracks(tracks);
        setWarningText(textForWarning)
    }

    const handlePlaylistSelect = async (selectedPlaylistId) => {
        if (!selectedPlaylistId) {
            return;
        }

        setCurrentTracks([]);
        setWarningText("Loading tracks...");

        let playlist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

        if (playlist) {
            let playlistTracks = await getFunctions.getAllPlaylistTracks(spotifyApi, selectedPlaylistId);

            if (helperShortlist) {
                playlistTracks = spotifyUtils.findTracksInShortlist(playlistTracks, helperShortlist.tracks);
            }

            if (playlistTracks.length === 0) {
                setWarningText('No songs available. This probably means none of the songs in this playlist are from this year!');
            }

            setCurrentTracks(playlistTracks);
        }
    }

    const handleShortlistButtonPress = async (playlistTracks, row) => {
        let modifiedShortlist = helperShortlist;

        // Create a shortlist on the Spotify profile at this point if they do 
        // not already have one.
        if (!helperShortlist) {
            modifiedShortlist = await playlistFunctions.createHelperShortlist(spotifyApi);
        }

        const modifiedLists = await playlistFunctions.processShortlistButtonPress(spotifyApi, row.original, playlistTracks, modifiedShortlist);

        setCurrentTracks(modifiedLists.playlistTracks);
        setHelperShortlist(modifiedLists.shortlist)
    }

    // Show logging in message while we wait for user data to populate.
    // Also wait for playlists to populate.
    if (!userData || !playlists) {
        return <div>Logging in...</div>
    }

    return (
        <div>
            <Header
                username={userData.display_name}
                image={userData.images[0].url} />
            <SpotifyButtonGroup
                types={sortTypes}
                playlists={playlists}
                noShortlist={helperShortlist == null}
                handleButtonPress={handleButtonPress}
                handlePlaylistSelect={handlePlaylistSelect} />
            <SpotifyDataTable
                tracks={currentTracks}
                warningText={warningText}
                handleShortlistButtonPress={handleShortlistButtonPress} />
        </div>
    )
}
