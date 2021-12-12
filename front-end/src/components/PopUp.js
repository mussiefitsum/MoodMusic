import { useState } from 'react';
import './PopUp.css'

export default function PopUp({ togglePopUp, playlist }) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setPlaylistDescription(event.target.value);
    }
    const songUris = playlist.map(song => song.uri);
    return (
        <div className="PopUp">
            <div className="PopUp-content">
                <div className="PopUp-cancel">
                    <i onClick={togglePopUp} className="fas fa-times-circle"></i>
                </div>
                <form className="PopUp-form" method="POST" action={`${ process.env.REACT_APP_BASE_URL }/myplaylist` || 'http://localhost:3001/myplaylist'}>
                    <div className="PopUp-form-group">
                        <label htmlFor="name" className="PopUp-form-label">Playlist Name</label>
                        <br />
                        <input value={playlistName} onChange={handleNameChange} id="name" name="name" type="text" className="PopUp-form-input" />
                    </div>
                    <div className="PopUp-form-group">
                        <label htmlFor="description" className="PopUp-form-label">Playlist Description</label>
                        <br />
                        <textarea value={playlistDescription} onChange={handleDescriptionChange} id="description" name="description" className="PopUp-form-textarea" />
                    </div>
                    <input type="hidden" name="playlist" value={songUris} />
                    <button className="PopUp-form-button">Add To Library</button>
                </form>
            </div>
        </div>
    )
}