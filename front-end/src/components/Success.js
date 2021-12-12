import { useState, useEffect } from 'react';
import './Success.css'
import Error from './Error.js'
import Loader from './Loader'

export default function Success() {
    const [playlistId, setPlaylistId] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState();
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch('/myplaylist');
                if (res.status >= 400 && res.status < 600) {
                    throw new Error('Something went wrong')
                } else {
                    const myPlaylist = await res.json();
                    setPlaylistId(myPlaylist.body.id);
                    setSuccess(true);
                    setLoading(false);
                }

            } catch (err) {
                setSuccess(false);
                setLoading(false);
            }
        }
        fetchPlaylist();
    }, [])
    const errMsg = 'Failed to generate playlist!'
    if (isLoading) {
        return (
            <div className="Success">
                <Loader message="Generating Playlist..." />
            </div>
        )
    } else if (!isSuccess) {
        return <Error message={errMsg} />
    } else {
        return (
            <div className="Success">
                <div className="Success-container">
                    <h1 className="Success-title">Your Spotify Playlist Has Been Made!</h1>
                    <a target="_blank" href={`https://open.spotify.com/playlist/${ playlistId }`} rel="noreferrer" className="Success-spotify-btn">View On Spotify</a>
                    <iframe className="Success-spotify-playlist" title="spotify-playlist" src={`https://open.spotify.com/embed/playlist/${ playlistId }?utm_source=generator`} height="425" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
                </div>
            </div>
        )
    }

}