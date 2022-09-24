import React, { useState, useEffect } from 'react'
import { loginUrl } from '../../spotifyConfig'
import About from '../pages/About';
import './Header.css';

export default function Header(props) {
    const [showAbout, setShowAbout] = useState(false);

    const signInJsx = <a href={loginUrl}>Sign in with Spotify!</a>
    const userNameJsx = <p className="user-name">{props.username}</p>;
    const imageJsx = <img src={props.image} alt="user" className="user-image"></img>

    function openAboutOverlay() {
        setShowAbout(!showAbout)
    }

    useEffect(() => {
        document.body.style.overflow = showAbout ? 'hidden' : 'auto';
    }, [showAbout])

    return (
        <div>
            <nav className="header">
                <div className="header-container">
                    <div className="header-title">
                        <p>Hottest 100 Helper</p>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => openAboutOverlay()}>
                            About
                        </button>
                    </div>
                    <div className="user-details">
                        {!props.username ? signInJsx : ""}
                        {props.username ? userNameJsx : ""}
                        {props.image ? imageJsx : ""}
                    </div>
                </div>
            </nav>
            {showAbout ? <About /> : null}
        </div>
    )
};