export function formatTracks(pulledTracks) {
    if (!pulledTracks) {
        return;
    }

    let formattedTracks = [];
    pulledTracks.forEach(trackData => {
        let track = trackData.track ? trackData.track : trackData;
        let album = track.album ? track.album : track.track.album;

        let formattedTrack = returnFormattedTrack(track, album);
        if (formattedTrack) {
            formattedTracks.push(formattedTrack);
        }
    });

    return formattedTracks;
}

export function formatAlbumTracks(pulledTracks) {
    if (!pulledTracks) {
        return;
    }

    let formattedTracks = [];
    pulledTracks.forEach((trackData, index) => {
        let track = trackData.track;
        let album = pulledTracks[index].album;

        let formattedTrack = returnFormattedTrack(track, album);
        if (formattedTrack) {
            formattedTracks.push(formattedTrack);
        }
    });

    return formattedTracks;
}

function returnFormattedTrack(track, album) {
    if (album.release_date && album.release_date.includes('2022')) {
        return {
            song: track.name,
            artist: track.artists[0].name,
            album: album.name,
            release_date: album.release_date,
            spotify: track.uri,
            youtube: 'todo',
            triple_j_top_song: 'false'
        }
    } else {
        return;
    }
}

// Get all user playlists when logging in - DONE
// Get the Hottest 100 Helper playlist if it exists - DONE
// Implement adding to playlist
// If playlist doesn't exist, create playlist
// Implement removing from the playlist 

export function addTrackToPlaylist(spotifyApi, playlist, track) {
    if (!playlist) {
        playlist = createHelperPlaylist(spotifyApi);
    }

    spotifyApi.addTracksToPlaylist('5ieJqeLJjjI8iJWaxeBLuK', [track])
        .then(function (data) {
            console.log('Added tracks to playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}

export function removeTrackFromPlaylist(spotifyApi, playlist, track) {
    var tracks = [{ uri: track }];
    spotifyApi.removeTracksFromPlaylist(playlist.id, tracks)
        .then(function (data) {
            console.log('Tracks removed from playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}

export function createHelperPlaylist(spotifyApi) {
    spotifyApi.createPlaylist('My playlist', { 'description': 'Your Hottest 100 shortlist created at <url>', 'public': true })
        .then(function (data) {
            console.log('Created playlist!');
            return data
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}
