import React from "react";
import './App.css';
import { loginUrl } from './spotifyConfig'

function HomeComponent() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hottest 100 Helper
                </p>
                <a href={loginUrl}>Sign in with Spotify!</a>
            </header>
        </div>
    );
}

export default HomeComponent;