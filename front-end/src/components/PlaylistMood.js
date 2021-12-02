import { useEffect, useState } from 'react';

export default function PlaylistMood() {
    const [playlist, setPlaylists] = useState();
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch('http://localhost:3001/playlists');
                const myPlaylists = await res.json();
                console.log(myPlaylists)
            } catch (err) {
                console.log(err);
                window.location = '/'
            }
        }
        fetchPlaylist();
    }, [])
    return (
        <div className="PlaylistMood">
            <h1>Choose Your Vibe</h1>

        </div>
    )
}
