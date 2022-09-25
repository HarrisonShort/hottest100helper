import React from 'react'

import "./About.css"
import "./Overlays.css"

export default function HowItWorks(props) {
    return (
        <div id="overlay-background">
            <div className="info-container">
                <button className="close-button" onClick={() => props.close()}>X</button>
                <h1>How It Works</h1>
            </div>
        </div>
    )
}
