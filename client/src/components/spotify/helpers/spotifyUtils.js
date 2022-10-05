export function formatTracks(pulledTracks) {
    if (!pulledTracks || pulledTracks.length === 0) {
        return pulledTracks;
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
            triple_j_top_song: 'false',
            inShortlist: false
        }
    } else {
        return;
    }
}

export const findTracksInShortlist = (tracks, shortlistTracks) => {
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

//#region Debug

export const getAlbumsForTracks = (spotifyApi, tracks) => {
    tracks.forEach((track, index) => {
        setTimeout(() => {
            spotifyApi.getTrack(track.spotify.replace('spotify:track:', ''))
                .then((data) => {
                    console.log(track.rank);
                    tracks[index].album = data.body.album.name
                    if (tracks.length === index + 1) {
                        console.log(JSON.stringify(tracks));
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 100 * index)
    });
}

export const fixRanks = (tracks) => {
    tracks.forEach((track, index) => {
        tracks[index].rank = index + 1;
    });

    console.log(JSON.stringify(tracks));
}

export const fixTimestamps = (tracks) => {
    tracks.forEach((track, index) => {
        tracks[index].release_date = tracks[index].release_date.substring(0, 10);
    });

    console.log(JSON.stringify(tracks));
}

//#endregion