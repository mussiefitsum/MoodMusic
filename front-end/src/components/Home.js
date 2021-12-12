import React from 'react';
import './Home.css'

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="Home-intro">
                    <h1 className="Home-title">Welcome to Mood Music</h1>
                    <h4 className="Home-subtitle">Choose a vibe, we make the playlist!</h4>
                    <form action="/login">
                        <button className="Home-btn">Login with Spotify</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home;