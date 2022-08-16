import React from "react";
import '../../../App.css';
import { TripleJTable } from "../../triplejtable/TripleJTable";
import Header from '../../Header';

function HomeComponent() {
    return (
        <div className="App">
            <Header />
            <TripleJTable />
        </div>
    );
}

export default HomeComponent;