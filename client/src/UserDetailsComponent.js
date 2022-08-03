import React from "react";
import './App.css';

function UserDetailsComponent() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3000/spotify-user-details")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Logged in as {data.display_name}
                </p>
                <img src={data.images[0].url}></img>
            </header>
        </div>
    );
}

export default UserDetailsComponent;
