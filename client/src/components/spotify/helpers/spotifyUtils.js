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
// Implement adding to playlist - DONE
// If playlist doesn't exist, create playlist - DONE
// Implement removing from the playlist 
