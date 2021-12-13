import { useState } from 'react';
import PopUp from './PopUp'
import './FinalPlaylist.css'

export default function FinalPlaylist({ playlist, playlistType }) {
    const [popup, setPopup] = useState(false);
    const togglePopUp = () => {
        setPopup(!popup);
    }
    return (
        <div className="FinalPlaylist">
            <h1 className="FinalPlaylist-title">Your {playlistType} Playlist Is Ready!</h1>
            <button className="FinalPlaylist-button" onClick={togglePopUp}>Add To Spotify Library</button>
            <div className="FinalPlaylist-container">
                {playlist.map(song => (
                    <a className="FinalPlaylist-tracklink" target="_blank" rel="noreferrer" href={song.track.external_urls.spotify} key={song.id}>
                        <div className="FinalPlaylist-track">
                            <img className="FinalPlaylist-track-img" src={song.track.album.images[0].url} alt={`${ song.track.name }`} />
                            <div className="FinalPlaylist-track-info">
                                <h3 className="FinalPlaylist-track-name">{song.track.name}</h3>
                                <h4 className="FinalPlaylist-track-artist">{song.track.artists[0].name}</h4>
                            </div>
                            <img className="FinalPlaylist-spotify-icon" src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1639354503/MoodMusic/Spotify_Icon_CMYK_Black_ltktdk.png" alt="Spotify" />
                        </div>
                    </a>
                ))}
            </div>
            {popup ? <PopUp togglePopUp={togglePopUp} playlist={playlist} /> : null}
        </div>
    )
}