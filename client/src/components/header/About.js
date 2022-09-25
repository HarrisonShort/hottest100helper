import React from 'react'

import "./About.css"
import "./Overlays.css"

export default function About(props) {
    return (
        <div id="overlay-background">
            <div className="info-container">
                <button className="close-button" onClick={() => props.close()}>X</button>
                <h1>About</h1>
                <h2>What is Hottest 100 Helper?</h2>
                <p>Feel like every year you go to vote for the <a href="https://www.abc.net.au/triplej/hottest100">Triple J Hottest 100</a> and you have no idea what your favourite tracks of the year were? Or maybe you forgot those bangers you loved in January, before all your favourite bands and artists released new albums. I do it every year. So I had the thought to make this web-app to help collate tracks you really loved from the year just gone by.</p>
                <p className="small-text">It also just so happens that I wanted to learn a little bit about web development and React...</p>
                <h2>How was this created?</h2>
                <p>This web-app was developed using React. In order to interface with your Spotify account, I used the Spotify Web API, which was made easier by the spotify-web-api-node package. You can view the source code of this project <a href="link">here</a>.</p>
                <h2>Is my data safe?</h2>
                <p>Your personal Spotify data is not stored. However, your visit may be used to record overall Hottest 100 Helper stats, for the sake of monitoring the use of this web-app.</p>
                <p className="disclaimer">Hottest 100 Helper is in no way associated with Triple J.</p>
            </div>
        </div>
    )
}
