import React, { Link } from 'react'
import { loginUrl } from '../spotifyConfig'

export default function Header(props) {
    const signInJsx = <a href={loginUrl}>Sign in with Spotify!</a>
    const userNameJsx = <p>{props.username}</p>;
    const imageJsx = <img src={props.image} alt="user"></img>

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* <Link to="/" className="navbar-logo">Hottest 100 Helper</Link> */}
                Hottest 100 Helper
            </div>
            <ul>
                <li className="nav-item">
                    {/* <Link to='/about' className="nav-links">
                        About
                    </Link> */}
                    About
                </li>
            </ul>
            {!props.username ? signInJsx : ""}
            {props.username ? userNameJsx : ""}
            {props.image ? imageJsx : ""}
        </nav>
    )
};