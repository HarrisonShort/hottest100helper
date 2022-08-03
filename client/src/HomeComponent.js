import React from "react";
import './App.css';

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

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hottest 100 Helper
                </p>
            <button onClick={event => window.location.href = 'http://localhost:5000/spotify-login'}>Sign in with Spotify!</button>
            </header>
        </div>
        );
}

export default HomeComponent;
