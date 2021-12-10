import { useState, useEffect } from 'react';
import './Success.css'

export default function Success() {
    const [playlistId, setPlaylistId] = useState();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch('http://localhost:3001/playlist');
                const myPlaylist = await res.json();
                console.log(myPlaylist);
                setPlaylistId(myPlaylist.body.id);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPlaylist();
    }, [])
    return (
        <div className="Success">
            {isLoading ? <div className="PlaylistMood-loading">
                <div className="PlaylistMood-loader"></div>
                <h1 className="PlaylistMood-loader-message">Loading Your Playlist</h1>
            </div> : <div className="Success-container">
                <h1 className="Success-title">Your Spotify Playlist Has Been Made!</h1>
                <a target="_blank" href={`https://open.spotify.com/playlist/${ playlistId }`} rel="noreferrer" className="Success-spotify-btn">View On Spotify</a>
                <iframe title="spotify-playlist" src={`https://open.spotify.com/embed/playlist/${ playlistId }?utm_source=generator`} height="425" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
            </div>}

        </div>
    )
}