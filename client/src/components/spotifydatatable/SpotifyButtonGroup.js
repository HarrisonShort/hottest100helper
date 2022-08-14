import React, { useState } from 'react'

export default function SpotifyButtonGroup(props) {

    return (
        <div>
            {
                props.types.map((type) => (
                    <button key={type} onClick={() => props.handleButtonPress(type)}>{type}</button>
                ))
            }
        </div>
    )
}
