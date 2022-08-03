import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomeComponent from "./HomeComponent";
import UserDetailsComponent from "./UserDetailsComponent";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeComponent />} />
                <Route path='/logged-in' element={<UserDetailsComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
