import React from 'react'

import "./HowItWorks.css"
import "./Overlays.css"

export default function HowItWorks(props) {
    return (
        <div id="overlay-background">
            <div className="info-container">
                <button className="close-button" onClick={() => props.close()}>X</button>
                <h1>How It Works</h1>
                <p>Hottest 100 Helper works by accessing different parts of your Spotify data, in order to find songs from the current year. You can then add any of these to a shortlist, which automatically shows up as a playlist on your Spotify account.</p>
                <h3>Top Tracks</h3>
                <p>Collates your "short term," "medium term" and "long term" top tracks, as designated by Spotify and grabs any from the current year.</p>
                <h3>Saved Tracks</h3>
                <p>Searches through your saved tracks and finds any that are from the current year.</p>
                <h3>Saved Albums</h3>
                <p>Searches through your saved albums and finds tracks from the current year.</p>
                <h3>Playlist Dropdown</h3>
                <p>Selecting a playlist will let the Hottest 100 Helper search through the specific playlist for tracks from the current year.</p>
                <h1>Roadmap</h1>
                <p>Here are some potential improvements for the future...</p>
                <h3>"Give Me Everything" Button</h3>
                <p>Early on, Hottest 100 Helper was just going to automatically scrub through your entire Spotify profile and create a monolith playlist with everything it could find from this year. This would still be a convenient option, but due to Spotify's rate limits, it could not be implemented at this time.</p>
                <h3>Last.fm Support</h3>
                <p>If you're a geek loser about music like me, you probably have a last.fm account which you've maintained for some crazy long time. I wanted to include support for last.fm because it would make it far easier to find your actual top tracks. Unfortunately, I don't have enough time for that. :(</p>
                <br />
            </div >
        </div >
    )
}
