import React from "react";
import './App.css';
import { loginUrl } from './spotifyConfig'

function HomeComponent() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3000/check-backend")
            .then((response) => response.json())
            .then((data) => {
                setData(data.express);
                console.log(data.express);
            });
    }, []);
    console.log(loginUrl)
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hottest 100 Helper
                </p>
                <a href={loginUrl}>Sign in with Spotify!</a>
            </header>
        </div>
    );
}

export default HomeComponent;