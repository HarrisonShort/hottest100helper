import React, { Link } from 'react'
import { loginUrl } from '../../spotifyConfig'
import './Header.css';

export default function Header(props) {
    const signInJsx = <a href={loginUrl}>Sign in with Spotify!</a>
    const userNameJsx = <p className="user-name">{props.username}</p>;
    const imageJsx = <img src={props.image} alt="user" className="user-image"></img>

    return (
        <nav className="header">
            <div className="header-container">
                <div className="header-title">
                    <p>Hottest 100 Helper</p>
                </div>
                <div className="nav-links">
                    <p className="header-item">
                        About
                    </p>
                </div>
                <div className="user-details">
                    {!props.username ? signInJsx : ""}
                    {props.username ? userNameJsx : ""}
                    {props.image ? imageJsx : ""}
                </div>
            </div>
        </nav>
    )
};