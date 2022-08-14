import { React, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../useAuth";
import Header from '../Header';
import SpotifyDataTable from "./SpotifyDataTable.js";

const spotifyApi = new SpotifyWebApi({
    clientId: 'e46e02da24384042b7a9d4a7cab689df'
});

export const SpotifyDashboard = ({ code }) => {
    const [userData, setUserData] = useState();
    const [topTracks, setTopTracks] = useState();
    const accessToken = useAuth(code);

    const getUserData = () => {
        spotifyApi.getMe()
            .then((data) => {
                setUserData(data.body);
            });
    }

    const getTopTracks = () => {
        spotifyApi.getMyTopTracks()
            .then((data) => {
                setTopTracks(formatTopTracks(data.body.items))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const formatTopTracks = (tracks) => {
        if (!tracks) {
            return;
        }

        let formattedTracks = [];
        tracks.map(track => {
            if (track.album.release_date.includes('2022')) {
                formattedTracks.push({
                    song: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    release_date: track.album.release_date,
                    spotify: track.uri,
                    youtube: 'todo',
                    triple_j_top_song: 'false'
                });
            }
        });

        console.log(formattedTracks);

        return formattedTracks;
    }

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);

        getUserData();
        getTopTracks();

    }, [accessToken]);

    if (!userData) {
        return <div>Logging in...</div>
    }

    return (
        <div>
            <Header username={userData.display_name} image={userData.images[0].url} />
            {topTracks ? <SpotifyDataTable tracks={topTracks} /> : <p>No Information Available </p>}
        </div>
    )
}
