import React from "react";
import './App.css';
import { loginUrl } from './spotify';

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/backend")
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
                    <a href={loginUrl} id="signInButton">Sign in with Spotify!</a>
                </p>
            </header>
        </div>
    );
}

export default App;
