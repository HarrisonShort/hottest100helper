import React from "react";
import '../../App.css';

import SpotifyDataTable from "../spotify/SpotifyDataTable";
import Header from '../header/Header';

import TRIPLE_J_DATA from '../triplejtable/TRIPLE_J_DATA.json';
import { COLUMNS } from '../triplejtable/columns';

function HomeComponent() {
    return (
        <div className="Home">
            <Header />
            <SpotifyDataTable
                columns={COLUMNS}
                tracks={TRIPLE_J_DATA}
                showShortlist={false} />
        </div>
    );
}

export default HomeComponent;