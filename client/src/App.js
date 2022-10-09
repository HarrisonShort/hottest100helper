import React from "react";
import './App.css';

import { SpotifyDashboard } from "./components/spotify/SpotifyDashboard";
import HomeComponent from "./components/pages/HomeComponent";
import Footer from "./components/footer/Footer";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return (
        <div className="app-container">
            <div className="app">
                {code ? <SpotifyDashboard code={code} /> : <HomeComponent />}
                <Footer />
            </div>
        </div>
    );
}

export default App;
