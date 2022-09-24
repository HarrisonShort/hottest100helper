
import * as getFunctions from "./spotifyGetFunctions";

export const createHelperShortlist = async (spotifyApi) => {
    return new Promise(resolve => {
        spotifyApi.createPlaylist('Hottest 100 Helper Shortlist', { 'description': 'Your Hottest 100 shortlist created at <url>', 'public': true })
            .then(function (data) {
                resolve({
                    'playlist': data,
                    'tracks': []
                });
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    });
}

/* Adds a given track to a given playlist. */
export const addTrackToPlaylist = async (spotifyApi, playlist, track) => {
    spotifyApi.addTracksToPlaylist(playlist.id, [track])
        .then(function (data) {
            console.log('Added tracks to playlist!');
        })
        .catch((err) => {
            console.log('Something went wrong!', err);
        });
}

export const getHelperShortlistTracks = async (spotifyApi, shortlist) => {
    let tracks = [];

    await getFunctions.getAllPlaylistTracks(spotifyApi, shortlist.id)
        .then((data) => {
            tracks = data;
        })
        .catch((err) => {
            console.log(`${getHelperShortlistTracks.name}: ${err}`);
        });

    return {
        'playlist': shortlist,
        'tracks': tracks
    };
}

export const findPlaylistTracksInShortlist = (tracks, shortlistTracks) => {
    tracks.forEach((track) => {
        for (var index = 0; index < shortlistTracks.length; index++) {
            track.inShortlist = track.spotify === shortlistTracks[index].spotify;
            if (track.inShortlist) {
                break;
            }
        }
    });

    return tracks;
}

/* Removes a given track from a given playlist. */
export function removeTrackFromPlaylist(spotifyApi, playlist, track) {
    spotifyApi.removeTracksFromPlaylist(playlist.id, [{ uri: track }])
        .then(function (data) {
            console.log('Tracks removed from playlist!');
        })
        .catch((err) => {
            console.log('Something went wrong!', err);
        });
}

/* Separates the Hottest 100 Helper shortlist from the given playlists */
export const separateHelperShortlist = (fetchedPlaylists, shortlist) => {
    let shortlistIndex = fetchedPlaylists.indexOf(shortlist);
    if (shortlistIndex !== -1) {
        fetchedPlaylists.splice(shortlistIndex, 1);
    }

    return fetchedPlaylists;
}

/* Handles adding or removing from the shortlist. Updates the given shortlist
data, as well as the playlist data, so that the UI can update appropriately. */
export const processShortlistButtonPress = async (spotifyApi, changedTrack, playlistTracks, shortlist) => {
    let changedTrackIndex = playlistTracks.findIndex(track => track.song === changedTrack.song);

    if (changedTrack.inShortlist) {
        await removeTrackFromPlaylist(spotifyApi, shortlist.playlist, changedTrack.spotify);

        let shortlistTrackIndex = shortlist.tracks.findIndex(track => track.song === changedTrack.song);
        shortlist = shortlist.tracks.splice(shortlistTrackIndex, 1);
    } else {
        await addTrackToPlaylist(spotifyApi, shortlist.playlist, changedTrack.spotify);
        shortlist.tracks.push(playlistTracks[changedTrackIndex]);
    }

    if (changedTrackIndex > -1) {
        playlistTracks[changedTrackIndex].inShortlist = !playlistTracks[changedTrackIndex].inShortlist;
    }

    return {
        'playlistTracks': playlistTracks,
        'shortlist': shortlist
    }
}