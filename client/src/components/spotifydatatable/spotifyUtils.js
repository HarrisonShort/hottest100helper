export function formatTracks(pulledTracks) {
    if (!pulledTracks) {
        return;
    }
    let formattedTracks = [];
    pulledTracks.forEach(track => {
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