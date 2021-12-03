import { useEffect, useState } from 'react';
import MoodCard from './MoodCard';
import './PlaylistMood.css'

const chillImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496617/MoodMusic/chill_kd1pyi.jpg';
const hypeImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496617/MoodMusic/high-energy_lc2coa.jpg';
const dancingImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496618/MoodMusic/dancing_tutetk.jpg';

export default function PlaylistMood() {
    // const [tracks, setTracks] = useState();
    // useEffect(() => {
    //     const fetchPlaylist = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3001/playlists');
    //             const myTracks = await res.json();
    //             console.log(myTracks)
    //         } catch (err) {
    //             console.log(err);
    //             window.location = '/'
    //         }
    //     }
    //     fetchPlaylist();
    // }, [])
    return (
        <div className="PlaylistMood">
            <h1 className="PlaylistMood-title">Choose Your Vibe</h1>
            <div className="PlaylistMood-container">
                <MoodCard text='Chill' img={chillImage} />
                <MoodCard text="Get Pumped" img={hypeImage} />
                <MoodCard text="Let's Dance" img={dancingImage} />
            </div>
        </div>
    )
}
