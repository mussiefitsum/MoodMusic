if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const { v4: uuidv4 } = require('uuid');

const app = express();

const secret = process.env.COOKIE_SECRET || 'topsecret100'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    genid: function (req) {
        return uuidv4()
    },
    resave: false,
    saveUninitialized: false,
    secret: secret
}))
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

const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret,
});


app.get('/login', (req, res) => {
    const state = req.sessionID
    const authUrl = spotifyApi.createAuthorizeURL(scopes, state, showDialog);
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
            res.redirect('/playlists' || 'http://localhost:3000/playlists');

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

app.get('/trackhistory', async (req, res) => {
    if (!spotifyApi._credentials.accessToken) {
        return res.redirect('/' || 'http://localhost:3000/')
    }
    try {
        const myTracks = await spotifyApi.getMySavedTracks({ limit: 50 });
        const trackHistory = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 49 });
        const songs = myTracks.body.items.concat(trackHistory.body.items);
        const songIds = [];
        for (let song of songs) {
            songIds.push(song.track.id);
        }
        const audioFeatureResults = await spotifyApi.getAudioFeaturesForTracks(songIds);
        const audioData = audioFeatureResults.body.audio_features;
        let finalTrackData = [];
        for (let i = 0; i < audioData.length; i++) {
            finalTrackData.push({ ...songs[i], ...audioData[i] });
        }
        res.json(finalTrackData);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
})

app.post('/myplaylist', async (req, res) => {
    if (!spotifyApi._credentials.accessToken) {
        return res.redirect('http://localhost:3000/')
    }
    const playlist = req.body.playlist.split(',');
    const name = req.body.name !== '' ? req.body.name : 'Mood Mix';
    const description = req.body.description !== '' ? req.body.description : 'An automatically generated playlist from Mood Music';
    try {
        const myPlaylist = await spotifyApi.createPlaylist(name, { 'description': description });
        await spotifyApi.addTracksToPlaylist(myPlaylist.body.id, playlist);
        app.set('playlist_id', myPlaylist.body.id);
        res.redirect('/complete' || 'http://localhost:3000/complete')
    } catch (err) {
        console.log(err);
        res.redirect('/' || 'http://localhost:3000/');
    }
})

app.get('/myplaylist', async (req, res) => {
    const myPlaylistId = app.get('playlist_id');
    try {
        const myPlaylist = await spotifyApi.getPlaylist(myPlaylistId);
        res.json(myPlaylist);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './front-end/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on Port ${ port }`);
});