import { useEffect, useState } from 'react';
import MoodCard from './MoodCard';
import Error from './Error'
import FinalPlaylist from './FinalPlaylist'
import Loader from './Loader'
import './PlaylistMood.css'
import { shufflePlaylist } from '../utilities/organizePlaylist';

const chillImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496617/MoodMusic/chill_kd1pyi.jpg';
const hypeImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638646526/MoodMusic/pumped_rhax1b.jpg';
const dancingImage = 'https://res.cloudinary.com/dfuxr1p10/image/upload/v1638496618/MoodMusic/dancing_tutetk.jpg';

export default function PlaylistMood() {
    const [tracks, setTracks] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState();
    const [playlist, setPlaylist] = useState();
    const [playlistType, setPlaylistType] = useState('');
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await fetch('http://localhost:3001/trackhistory');
                if (res.status >= 400 && res.status < 600) {
                    throw new Error('Something went wrong when fetching your tracks')
                } else {
                    const myTracks = await res.json();
                    const uniqueTracks = myTracks.filter((song, index, self) =>
                        index === self.findIndex((s) => (s.id === song.id && s.track.name === song.track.name))
                    )
                    console.log(uniqueTracks);
                    setTracks(uniqueTracks);
                    setSuccess(true);
                    setLoading(false);
                }

            } catch (err) {
                console.log(err);
                setSuccess(false);
                setLoading(false);
            }
        }
        fetchTracks();
    }, [])
    const errMsg = 'Failed to fetch your tracks';
    const dancePlaylist = (arr) => {
        return arr.filter(song => (song.danceability > 0.7 && song.energy > 0.6) || song.danceability > 0.8);
    }
    const handleDance = () => {
        setLoading(true);
        const dance = dancePlaylist(tracks);
        setPlaylist(shufflePlaylist(dance));
        setPlaylistType(`Let's Dance`);
        setLoading(false);
    }
    const pumpedPlaylist = (arr) => {
        return arr.filter(song => (song.energy > .75 && song.danceability < .5) || song.energy > .85);
    }
    const handlePump = () => {
        setLoading(true);
        const pump = pumpedPlaylist(tracks);
        setPlaylist(shufflePlaylist(pump));
        setPlaylistType('Get Pumped');
        setLoading(false);
    }

    const chillPlaylist = (arr) => {
        return arr.filter(song => song.danceability < 0.7 && song.energy < 0.6)
    }
    const handleChill = () => {
        setLoading(true);
        const chill = chillPlaylist(tracks);
        setPlaylist(shufflePlaylist(chill));
        setPlaylistType('Chill');
        setLoading(false);
    }
    if (isLoading) {
        return (
            <div className="PlaylistMood">
                <Loader message="Loading Saved and Recently Played Tracks..." />
            </div>
        )
    } else if (!isSuccess) {
        return <Error message={errMsg} />;
    } else if (playlist !== undefined) {
        return (
            <div className="PlaylistMood">
                <FinalPlaylist playlist={playlist} playlistType={playlistType} />
            </div>
        )
    } else {
        return (
            <div className="PlaylistMood">
                <div className="PlaylistMood-content">
                    <h1 className="PlaylistMood-title">Choose Your Vibe</h1>
                    <div className="PlaylistMood-container">
                        <MoodCard text='Chill' img={chillImage} makePlaylist={handleChill} />
                        <MoodCard text="Get Pumped" img={hypeImage} makePlaylist={handlePump} />
                        <MoodCard text="Let's Dance" img={dancingImage} makePlaylist={handleDance} />
                    </div>
                </div>
            </div>
        )
    }
}
