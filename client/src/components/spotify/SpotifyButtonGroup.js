import React from 'react'
import './SpotifyButtonGroup.css';

export default function SpotifyButtonGroup(props) {
    const handleDropdownSelect = (event) => {
        props.handlePlaylistSelect(event.target.value);
    }

    return (
        <div className="button-group">
            {
                props.types.map((type) => (
                    <button key={type} onClick={() => props.handleButtonPress(type)}>{type}</button>
                ))
            }
            <select onChange={handleDropdownSelect}>
                <option value="Select a playlist">Select a playlist</option>
                {
                    props.playlists.map((playlist, index) => (
                        <option key={index} value={playlist.id}>{playlist.name}</option>
                    ))
                }
            </select>
            <button key="shortlist" onClick={() => props.handleButtonPress("shortlist")} disabled={props.noShortlist}>Your Shortlist</button>
        </div>
    )
}
