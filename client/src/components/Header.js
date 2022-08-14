import React, { Link } from 'react'

export default function Header() {
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
        </nav>
    )
};