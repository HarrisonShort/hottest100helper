import React from "react";
import '../../App.css';
import { TripleJTable } from "../triplejtable/TripleJTable";
import Header from '../header/Header';
import Footer from "../footer/Footer";

function HomeComponent() {
    return (
        <div className="Home">
            <Header />
            <TripleJTable />
        </div>
    );
}

export default HomeComponent;