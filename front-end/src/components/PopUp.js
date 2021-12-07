import { useState } from 'react';
import './PopUp.css'

export default function PopUp({ togglePopUp, playlist }) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const handleNameChange = (event) => {
        event.preventDefault();
        setPlaylistName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        event.preventDefault();
        setPlaylistDescription(event.target.value);
    }
    const handleClick = () => {
        const songUris = playlist.map(song => song.uri);
        const postPlaylist = async () => {
            await fetch('http://localhost:3001/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playlistName !== '' ? playlistName : 'Mood Music Mix',
                    description: playlistDescription !== '' ? playlistDescription : 'Automatically generated playlist by Mood Music',
                    songs: songUris
                })
            })
        }
        postPlaylist();
    }
    return (
        <div className="PopUp">
            <div className="PopUp-content">
                <div className="PopUp-cancel">
                    <i onClick={togglePopUp} className="fas fa-times-circle"></i>
                </div>
                <div className="PopUp-form">
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
                    <button className="PopUp-form-button" onClick={handleClick}>Add To Library</button>
                </div>
            </div>
        </div>
    )
}