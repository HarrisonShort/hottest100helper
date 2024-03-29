import React, { useState } from 'react'
import './SpotifyButtonGroup.css';

const initialOptionValue = "Select a playlist";

export default function SpotifyButtonGroup(props) {
    const [playlistSelected, setPlaylistSelected] = useState(initialOptionValue);

    const handleDropdownSelect = (event) => {
        setPlaylistSelected(event.target.value);
        props.handlePlaylistSelect(event.target.value);
    }

    const onButtonClick = (type) => {
        setPlaylistSelected(initialOptionValue);
        props.handleButtonPress(type);
    }

    return (
        <div className="button-group-container">
            <div className="button-group">
                {
                    props.types.map((type) => (
                        <button key={type} onClick={() => onButtonClick(type)} disabled={props.loading}>{type}</button>
                    ))
                }
                <select onChange={handleDropdownSelect} value={playlistSelected} disabled={props.loading}>
                    <option value={initialOptionValue}>Select a playlist</option>
                    {
                        props.playlists.map((playlist, index) => (
                            <option key={index} value={playlist.id}>{playlist.name}</option>
                        ))
                    }
                </select>
                <button key="shortlist" onClick={() => onButtonClick("shortlist")} disabled={props.noShortlist || props.loading}>Your Shortlist</button>
            </div>
        </div>

    )
}
