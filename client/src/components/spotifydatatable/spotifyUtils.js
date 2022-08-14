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