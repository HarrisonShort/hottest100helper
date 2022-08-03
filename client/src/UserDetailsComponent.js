import { React, Component } from "react";
import './App.css';

export default class UserDetailsComponent extends Component {

    componentDidMount() {
        fetch("http://localhost:3000/spotify-user-details")
            .then((response) => response.json())
            .then((data) => {
                this.setState(data, () => console.log(this.state));
            });
    }

    render() {
        if (!this.state) {
            return <div></div>
        }
        return (
            < div className="App" >
                <header className="App-header">
                    <p>
                        Logged in as {this.state.display_name}
                    </p>
                    <img src={this.state.images[0].url}></img>
                </header>
            </div >
        );
    }
}
