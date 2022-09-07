import * as spotifyUtils from "./spotifyUtils";

let helperPlaylist = null;

export const getUserData = (spotifyApi) => {
    return new Promise(resolve => {
        spotifyApi.getMe()
            .then((data) => {
                resolve(data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

//#region Playlists

export const getAllPlaylistsAsync = async (spotifyApi, userId) => {
    let offset = 0;
    let currentPlaylists = await getAllPlaylists(spotifyApi, userId, offset);

    do {
        offset += 50;
        let nextPlaylists = await getAllPlaylists(spotifyApi, userId, offset);
        currentPlaylists = currentPlaylists.concat(nextPlaylists);
    } while (currentPlaylists.length % 50 === 0)

    return returnValidPlaylists(currentPlaylists, userId);
}

function getAllPlaylists(spotifyApi, userId, offset) {
    return new Promise(resolve => {
        spotifyApi.getUserPlaylists(userId, {
            limit: 50,
            offset: offset
        })
            .then((data) => {
                resolve(data.body.items);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

function returnValidPlaylists(playlists, userId) {
    return playlists.filter(function (playlist) {
        return (playlist.owner.id === userId && playlist.tracks.total > 0);
    })
}

//#endregion

//#region Playlist Tracks

export const getAllPlaylistTracks = async (spotifyApi, playlistId) => {
    let offset = 0;
    let currentTracks = await getPlaylistTracks(spotifyApi, playlistId, offset);

    do {
        offset += 50;
        let nextTracks = await getPlaylistTracks(spotifyApi, playlistId, offset);
        currentTracks = currentTracks.concat(nextTracks);
    } while (currentTracks.length % 50 === 0)

    console.log(currentTracks)
    return spotifyUtils.formatTracks(currentTracks);
}

function getPlaylistTracks(spotifyApi, playlistId, offset) {
    return new Promise(resolve => {
        spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset })
            .then((data) => {
                let tracks = [];
                data.body.items.forEach(track => tracks.push(track.track));
                resolve(spotifyUtils.formatTracks(tracks));
            })
            .catch((error) => {
                console.log(error);
            })
    });
}

//#endregion

//#region Top Tracks

export const getAllTopTracks = async (spotifyApi, timeRange) => {
    let topTracks = await getTopTracks(spotifyApi, "short_term");
    topTracks = topTracks.concat(await getTopTracks(spotifyApi, "medium_term"));
    topTracks = topTracks.concat(await getTopTracks(spotifyApi, "long_term"));
    console.log(topTracks)

    return topTracks;
}

const getTopTracks = (spotifyApi, timeRange) => {
    return new Promise(resolve => {
        spotifyApi.getMyTopTracks({
            limit: 50,
            time_range: timeRange
        })
            .then((data) => {
                resolve(spotifyUtils.formatTracks(data.body.items));
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
//#endregion

//#region Saved Tracks

export const getAllSavedTracks = async (spotifyApi) => {
    let offset = 0;
    let currentTracks = await getSavedTracks(spotifyApi, offset);

    do {
        offset += 50;
        let nextTracks = await getSavedTracks(spotifyApi, offset);
        currentTracks = currentTracks.concat(nextTracks);
    } while (currentTracks.length % 50 === 0)

    return currentTracks;
}

const getSavedTracks = (spotifyApi, offset) => {
    return new Promise(resolve => {
        spotifyApi.getMySavedTracks({
            limit: 50,
            offset: offset
        })
            .then((data) => {
                let tracks = [];
                data.body.items.forEach(track => tracks.push(track.track));
                resolve(spotifyUtils.formatTracks(tracks));
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

//#endregion

//#region Saved Album Tracks

// TODO: Find out why the getSavedAlbums code here cannot be split into another function without wrapping it in a Promise.
export const getAllSavedAlbumTracks = async (spotifyApi) => {
    let offset = 0;
    let currentAlbums = await getSavedAlbums(spotifyApi, offset);

    do {
        offset += 50;
        let nextAlbums = await getSavedAlbums(spotifyApi, offset);
        currentAlbums = currentAlbums.concat(nextAlbums);
    } while (currentAlbums.length % 50 === 0)

    currentAlbums = returnValidAlbums(currentAlbums);

    return getSavedAlbumTracks(currentAlbums);
}

function returnValidAlbums(currentAlbums) {
    return currentAlbums.filter(function (albumData) {
        return (albumData.added_at.includes('2022') &&
            albumData.album.release_date &&
            albumData.album.release_date.includes('2022'));
    });
}

const getSavedAlbums = (spotifyApi, offset) => {
    return new Promise(resolve => {
        spotifyApi.getMySavedAlbums({
            limit: 50,
            offset: offset
        })
            .then((data) => {
                console.log(data.body.items)
                resolve(data.body.items);
            })
            .catch((error) => {
                console.log(error);
            })
    })
}

const getSavedAlbumTracks = (albums) => {
    let albumTracks = [];
    console.log(albums)

    albums.forEach(album => {
        album.album.tracks.items.forEach(track => {
            albumTracks.push({ track: track, album: album.album })
        });
    });

    return spotifyUtils.formatAlbumTracks(albumTracks);
}

//#endregion
