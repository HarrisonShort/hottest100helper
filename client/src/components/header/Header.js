import React, { useState, useEffect } from 'react'
import { loginUrl } from '../../spotifyConfig'
import About from './About';
import HowItWorks from './HowItWorks';
import './Header.css';

export default function Header(props) {
    const [showAbout, setShowAbout] = useState(false);
    const [showHowItWorks, setShowHowItWorks] = useState(false);

    const signInJsx = <a href={loginUrl}>Sign in with Spotify!</a>
    const userNameJsx = <p className="user-name">{props.username}</p>;
    const imageJsx = <img src={props.image} alt="user" className="user-image"></img>

    function toggleAboutOverlay() {
        setShowHowItWorks(false)
        setShowAbout(!showAbout)
    }

    function toggleHowItWorksOverlay() {
        setShowAbout(false);
        setShowHowItWorks(!showHowItWorks)
    }

    useEffect(() => {
        document.body.style.overflow = showAbout || showHowItWorks ? 'hidden' : 'auto';
    }, [showAbout, showHowItWorks])

    return (
        <div>
            <nav className="header">
                <div className="header-container">
                    <div className="header-title">
                        <p>Hottest 100 Helper 2022</p>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => toggleAboutOverlay()}>
                            About
                        </button>
                        <button onClick={() => toggleHowItWorksOverlay()}>
                            How It Works
                        </button>
                    </div>
                    <div className="user-details">
                        {!props.username ? signInJsx : ""}
                        {props.username ? userNameJsx : ""}
                        {props.image ? imageJsx : ""}
                    </div>
                </div>
            </nav>
            {showAbout ? <About close={toggleAboutOverlay} /> : null}
            {showHowItWorks ? <HowItWorks close={toggleHowItWorksOverlay} /> : null}
        </div>
    )
};