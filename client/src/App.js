import React from "react";
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomeComponent from "./HomeComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const code = new URLSearchParams(window.location.search).get('code');

function App() {

    return (
        <div className="app">
            {code ? <UserDetailsComponent code={code} /> : <HomeComponent />}
        </div>
    );
}

export default App;
