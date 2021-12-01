import React from 'react';

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const loginUrl = process.env.REACT_APP_LOGIN_URL;
const scopes = 'playlist-modify-private playlist-modify-public user-read-recently-played user-read-private user-read-email user-library-read';
const scopesQuery = encodeURIComponent(scopes);

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <h1>Welcome to Mood Music</h1>
                <form action="http://localhost:3001/login">
                    <button>Login with Spotify</button>
                </form>
            </div>
        )
    }
}

export default Home;