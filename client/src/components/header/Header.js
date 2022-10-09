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
        // TODO: This goes against React best practices by directly modifying the node.
        // Realistically we should be able to update the style of the node, but at this 
        // time that would require prop-drilling a reference to app-container into this 
        // component... I think...
        let appNodeStyle = document.getElementsByClassName("app-container")[0].style;
        appNodeStyle.overflow = showAbout || showHowItWorks ? 'hidden' : 'auto';
        appNodeStyle.position = showAbout || showHowItWorks ? 'fixed' : 'static';
    }, [showAbout, showHowItWorks]);

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