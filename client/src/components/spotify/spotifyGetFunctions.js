import * as spotifyUtils from "./spotifyUtils";

let helperPlaylist = null;

export const getAllPlaylistsAsync = async (spotifyApi, userId) => {
    let offset = 0;
    let currentPlaylists = await getAllPlaylists(spotifyApi, userId, offset);

    do {
        offset += 50;
        let nextPlaylists = await getAllPlaylists(spotifyApi, userId, offset);
        currentPlaylists = currentPlaylists.concat(nextPlaylists);
    } while (currentPlaylists.length % 50 === 0)

    return removeInvalidPlaylists(currentPlaylists);
}

export function getAllPlaylists(spotifyApi, userId, offset) {
    return new Promise(resolve => {
        let currentPlaylists = [];
        spotifyApi.getUserPlaylists(userId, {
            limit: 50,
            offset: offset
        })
            .then((data) => {
                // data.body.items.forEach((playlist) => {
                //     if (playlist.name === "Hottest 100 Helper Shortlist") {
                //         helperPlaylist = playlist;
                //     } else if (playlist.owner.id === userId && playlist.tracks.total > 0) {
                //         currentPlaylists.push(playlist);
                //     }
                // });

                data.body.items.forEach((playlist) => {
                    currentPlaylists.push(playlist);
                });

                console.log(currentPlaylists);

                resolve(currentPlaylists);

                // if (data.body.items.length < 50) {
                //     //setPlaylists(currentPlaylists);
                // } else {
                //     getAllPlaylists(spotifyApi, userId, currentPlaylists, offset + 50)
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    })

}

function removeInvalidPlaylists(playlists, userId) {
    let validPlaylists = playlists.filter(function (playlist) {
        console.log(playlist)
        return (playlist.owner.id === userId && playlist.tracks.total > 0);
    })
}

export const getAllPlaylistTracks = (playlists) => {
    let playlistTracks = [];
    playlists.forEach((playlist) => {
        getPlaylistTracks(playlist, playlistTracks, 0);
    })
}

export const getPlaylistTracks = (spotifyApi, playlist, previousTracks, offset) => {
    let playlistTracks = previousTracks;

    spotifyApi.getPlaylistTracks(playlist.id, { limit: 50, offset: offset })
        .then((data) => {
            data.body.items.forEach((item) => {
                playlistTracks.push(item.track);
            })

            if (data.body.items.length < 50) {
                //setCurrentTracks(spotifyUtils.formatTracks(playlistTracks));
                //setWarningText("No songs available. This probably means none of the tracks in this playlist are from this year!")
            } else {
                getPlaylistTracks(playlist, playlistTracks, offset + 50)
            }
        })
}