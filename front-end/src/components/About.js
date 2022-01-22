import './About.css'

export default function About() {
    return (
        <div className="About">
            <h1 className="About-title">About</h1>
            <div className="About-container">
                <img className="About-img" src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1642817360/MoodMusic/spotify-playlist_imztwv_lwkjfb.jpg" alt="" />
                <div className="About-text">
                    <h3 className="About-subhead">The Tech</h3>
                    <p>Mood Music is a web application built with <strong>ExpressJS</strong>, <strong>ReactJS</strong>, and <strong>the Spotify API</strong>.
                        This app pulls your recently played and saved tracks and organizes them into a playlist.</p>
                    <p>Users have a choice between three playlist moods: <strong>Chill</strong>, <strong>Get Pumped</strong>, and <strong>Let's Dance</strong>.
                        The <strong>Chill</strong> option will grab your slower and relaxed tracks, <strong>Get Pumped</strong> will grab your energetic tracks that get you hyped up,
                        and <strong>Let's Dance</strong> throws your more rhythmic tracks together that you can't help but groove to.</p>
                    <h3 className="About-subhead">Contact</h3>
                    <p>If you want to get in touch, then you can reach me here:</p>
                    <p><a className="About-link" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mussiefitsum/"><strong>LinkedIn</strong></a> | <a className="About-link" target="_blank" rel="noreferrer" href="https://github.com/mussiefitsum"><strong>GitHub</strong></a> | mussie.fitsum@gmail.com</p>
                </div>
            </div>
        </div>
    )
}