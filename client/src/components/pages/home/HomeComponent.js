import React from "react";
import '../../../App.css';
import { TripleJTable } from "../../triplejtable/TripleJTable";
import Header from '../../Header';
import Footer from "../../footer/Footer";

function HomeComponent() {
    return (
        <div className="App">
            <Header />
            <TripleJTable />
            <Footer />
        </div>
    );
}

export default HomeComponent;