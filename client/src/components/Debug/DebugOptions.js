import React from 'react';
import TRIPLE_J_DATA from '../triplejtable/TRIPLE_J_DATA.json';
import * as spotifyUtils from "../spotify/helpers/spotifyUtils";

export default function DebugOptions(props) {
    return (
        <div>
            <button onClick={() => spotifyUtils.getAlbumsForTracks(props.spotifyApi, TRIPLE_J_DATA)}>
                Get Albums for Triple J Tracks
            </button>
            <button onClick={() => spotifyUtils.fixRanks(TRIPLE_J_DATA)}>
                Fix Triple J Data Ranks
            </button>
            <button onClick={() => spotifyUtils.fixTimestamps(TRIPLE_J_DATA)}>
                Fix Triple J Data Timestamps
            </button>
        </div>
    )
}
