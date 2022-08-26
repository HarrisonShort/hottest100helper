import { React, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../useAuth";
import Header from '../Header';
import SpotifyButtonGroup from "./SpotifyButtonGroup";
import SpotifyDataTable from "./SpotifyDataTable.js";
import * as spotifyUtils from "./spotifyUtils";
import Footer from "../footer/Footer";

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

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);
        getUserData();

    }, [accessToken]);

    useEffect(() => {
        if (!accessToken || !userData) {
            return;
        }

        getAllPlaylists([], 0);
    }, [userData]);

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

    const getAllPlaylists = (previousPlaylists, offset) => {
        let currentPlaylists = previousPlaylists;
        spotifyApi.getUserPlaylists(userData.id, {
            limit: 50,
            offset: offset
        })
            .then((data) => {
                data.body.items.forEach((playlist) => {
                    if (playlist.owner.id === userData.id && playlist.tracks.total > 0) {
                        currentPlaylists.push(playlist);
                    }
                });

                if (data.body.items.length < 50) {
                    setPlaylists(currentPlaylists);
                } else {
                    getAllPlaylists(currentPlaylists, offset + 50)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getAllPlaylistTracks = (playlists) => {
        let playlistTracks = [];
        playlists.forEach((playlist) => {
            getPlaylistTracks(playlist, playlistTracks, 0);
        })
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
            default:
                console.log(`${buttonPressed} not yet implemented`);
                break;
        }
    }

    const handlePlaylistSelect = (selectedPlaylistId) => {
        if (!selectedPlaylistId) {
            return;
        }

        setCurrentTracks([]);
        setWarningText("Loading tracks...");

        let playlist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

        if (playlist) {
            getPlaylistTracks(playlist, [], 0);
        }
    }

    const getPlaylistTracks = (playlist, previousTracks, offset) => {
        let playlistTracks = previousTracks;

        spotifyApi.getPlaylistTracks(playlist.id, { limit: 50, offset: offset })
            .then((data) => {
                data.body.items.forEach((item) => {
                    playlistTracks.push(item.track);
                })

                if (data.body.items.length < 50) {
                    setCurrentTracks(spotifyUtils.formatTracks(playlistTracks));
                    setWarningText("No songs available. This probably means none of the tracks in this playlist are from this year!")
                } else {
                    getPlaylistTracks(playlist, playlistTracks, offset + 50)
                }
            })
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
