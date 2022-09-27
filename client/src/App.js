import React from "react";
import './App.css';

import { SpotifyDashboard } from "./components/spotify/SpotifyDashboard";
import HomeComponent from "./components/pages/HomeComponent";
import Footer from "./components/footer/Footer";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return (
        <div className="App">
            {code ? <SpotifyDashboard code={code} /> : <HomeComponent />}
            <Footer />
        </div>
    );
}

export default App;
