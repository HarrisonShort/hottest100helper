import React from "react";
import '../../../App.css';
import { loginUrl } from '../../../spotifyConfig'
import { TripleJTable } from "../../triplejtable/TripleJTable";
import Header from '../../Header';

function HomeComponent() {
    return (
        <div className="App">
            <Header />
            <header className="App-header">
                <p>
                    Hottest 100 Helper
                </p>
                <a href={loginUrl}>Sign in with Spotify!</a>

            </header>
            <TripleJTable />

        </div>


    );
}

export default HomeComponent;