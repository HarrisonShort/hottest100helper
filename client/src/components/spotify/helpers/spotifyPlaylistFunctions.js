export const createHelperPlaylist = (spotifyApi) => {
    return new Promise(resolve => {
        spotifyApi.createPlaylist('Hottest 100 Helper Shortlist', { 'description': 'Your Hottest 100 shortlist created at <url>', 'public': true })
            .then(function (data) {
                resolve(data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    });
}

export const addTrackToPlaylist = async (spotifyApi, playlist, track) => {
    spotifyApi.addTracksToPlaylist(playlist.id, [track])
        .then(function (data) {
            console.log('Added tracks to playlist!');
            console.log(data);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}



export function removeTrackFromPlaylist(spotifyApi, playlist, track) {
    spotifyApi.removeTracksFromPlaylist(playlist.id, [{ uri: track }])
        .then(function (data) {
            console.log('Tracks removed from playlist!');
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}