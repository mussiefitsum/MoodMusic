import { useState, useEffect } from 'react';

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
                <h1 className="PlaylistMood-loader-message">Loading Saved and Recently Played Tracks</h1>
            </div> : <div className="Success-container">
                <h1 className="Success-title">Success</h1>
                <iframe src={`https://open.spotify.com/embed/playlist/${ playlistId }?utm_source=generator`} width="70%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
            </div>}

        </div>
    )
}