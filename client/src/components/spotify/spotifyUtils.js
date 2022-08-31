export function formatTracks(pulledTracks) {
    if (!pulledTracks) {
        return;
    }
    let formattedTracks = [];
    pulledTracks.forEach(track => {
        if (track.album.release_date && track.album.release_date.includes('2022')) {
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

    return formattedTracks;
}

export function formatAlbumTracks(pulledTracks) {
    if (!pulledTracks) {
        console.log('no pulled tracks!');
        return;
    }

    let formattedTracks = [];
    console.log(pulledTracks)
    console.log(pulledTracks[0].track)
    console.log(pulledTracks[0].album)
    pulledTracks.forEach(track => {
        if (track.album.release_date.includes('2022')) {
            formattedTracks.push({
                song: track.track.name,
                artist: track.track.artists[0].name,
                album: track.album.name,
                release_date: track.album.release_date,
                spotify: track.track.uri,
                youtube: 'todo',
                triple_j_top_song: 'false'
            });
        }
    });

    return formattedTracks;
}

export function getTopTracks(spotifyApi) {
    spotifyApi.getMyTopTracks({
        limit: 50
    })
        .then((data) => {
            console.log(data.body.items);
            return formatTracks(data.body.items);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Get all user playlists when logging in - DONE
// Get the Hottest 100 Helper playlist if it exists
// Implement adding to playlist
// If playlist doesn't exist, create playlist
// Implement removing from the playlist 

export function addTrackToPlaylist(spotifyApi, playlist, track) {
    spotifyApi.addTracksToPlaylist('5ieJqeLJjjI8iJWaxeBLuK', [track])
        .then(function (data) {
            console.log('Added tracks to playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}

export function removeTrackFromPlaylist(spotifyApi) {
    var tracks = [{ uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" }];
    var playlistId = '5ieJqeLJjjI8iJWaxeBLuK';
    var options = { snapshot_id: "0wD+DKCUxiSR/WY8lF3fiCTb7Z8X4ifTUtqn8rO82O4Mvi5wsX8BsLj7IbIpLVM9" };
    spotifyApi.removeTracksFromPlaylist(playlistId, tracks, options)
        .then(function (data) {
            console.log('Tracks removed from playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}

export function createHelperPlaylist(spotifyApi) {
    spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true })
        .then(function (data) {
            console.log('Created playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}
