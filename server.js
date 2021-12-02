if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './front-end/build')));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const scopes = [
    'playlist-modify-private',
    'playlist-modify-public',
    'user-read-recently-played',
    'user-read-private',
    'user-read-email',
    'user-library-read'
];

const showDialog = true;
const state = 'chicken'

const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret,
});

const authUrl = spotifyApi.createAuthorizeURL(scopes, state, showDialog);

app.get('/login', (req, res) => {
    res.redirect(authUrl);
});

app.get('/callback', (req, res, next) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${ error }`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${ expires_in } s.`
            );
            res.redirect('http://localhost:3000/playlists');

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${ error }`);
        });
});

app.get('/playlists', async (req, res) => {
    if (!spotifyApi._credentials.accessToken) {
        return res.redirect('http://localhost:3000/')
    }
    try {
        const myPlaylists = await spotifyApi.getUserPlaylists();
        res.json(myPlaylists);
    } catch (err) {
        console.log(err);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './front-end/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on Port ${ port }`);
});