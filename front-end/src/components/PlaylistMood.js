import { useEffect, useState } from 'react';
import MoodCard from './MoodCard';
import './PlaylistMood.css'

const chillImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496617/MoodMusic/chill_kd1pyi.jpg';
const hypeImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638646526/MoodMusic/pumped_rhax1b.jpg';
const dancingImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496618/MoodMusic/dancing_tutetk.jpg';

export default function PlaylistMood() {
    const [tracks, setTracks] = useState();
    const [isLoading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState();
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await fetch('http://localhost:3001/trackhistory');
                const myTracks = await res.json();
                console.log(myTracks);
                setTracks(myTracks);
                setLoading(false);
            } catch (err) {
                console.log(err);
                window.location = '/'
            }
        }
        fetchTracks();
    }, [])
    const dancePlaylist = (arr) => {
        return arr.filter(song => (song.danceability > 0.7 && song.energy > 0.6) || song.danceability > 0.8);
    }
    const handleDance = () => {
        const dance = dancePlaylist(tracks);
        console.log(dance);
    }
    const pumpedPlaylist = (arr) => {
        return arr.filter(song => (song.energy > .75 && song.danceability < .5) || song.energy > .85)
    }
    const handlePump = () => {
        const pump = pumpedPlaylist(tracks);
        console.log(pump);
    }

    const chillPlaylist = (arr) => {
        return arr.filter(song => song.danceability < 0.7 && song.energy < 0.6)
    }
    const handleChill = () => {
        const chill = chillPlaylist(tracks);
        console.log(chill);
    }

    return (
        <div className="PlaylistMood">
            {isLoading ?
                <div className="PlaylistMood-loading">
                    <div className="PlaylistMood-loader"></div>
                </div>
                :
                <div className="PlaylistMood-content">
                    <h1 className="PlaylistMood-title">Choose Your Vibe</h1>
                    <div className="PlaylistMood-container">
                        <MoodCard text='Chill' img={chillImage} makePlaylist={handleChill} />
                        <MoodCard text="Get Pumped" img={hypeImage} makePlaylist={handlePump} />
                        <MoodCard text="Let's Dance" img={dancingImage} makePlaylist={handleDance} />
                    </div>
                </div>
            }
        </div>
    )
}
