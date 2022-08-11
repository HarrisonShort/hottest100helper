import React from "react";
import './App.css';
import { loginUrl } from './spotifyConfig'
import { TripleJTable } from "./triplejtable/TripleJTable";

function HomeComponent() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hottest 100 Helper
                </p>
                <a href={loginUrl}>Sign in with Spotify!</a>
                <TripleJTable />
            </header>
        </div>
    );
}

export default HomeComponent;