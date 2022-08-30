import React, { Link } from 'react'
import { loginUrl } from '../../spotifyConfig'
import './Header.css';

export default function Header(props) {
    const signInJsx = <a href={loginUrl}>Sign in with Spotify!</a>
    const userNameJsx = <p>{props.username}</p>;
    const imageJsx = <img src={props.image} alt="user" className="user-image"></img>

    return (
        <nav className="header">
            <div className="header-container">
                Hottest 100 Helper
                <ul>
                    <li className="header-item">
                        {/* <Link to='/about' className="nav-links">
                        About
                    </Link> */}
                        About
                    </li>
                </ul>
                <div className="user-details">
                    {!props.username ? signInJsx : ""}
                    {props.username ? userNameJsx : ""}
                    {props.image ? imageJsx : ""}
                </div>
            </div>
        </nav>
    )
};