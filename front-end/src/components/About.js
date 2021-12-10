import './About.css'

export default function About() {
    return (
        <div className="About">
            <h1 className="About-title">About</h1>
            <div className="About-intro">
                <img className="About-img" src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1639102942/MoodMusic/mood-music-mockup_lkyji8.png" alt="" />
                <p className="About-text">Mood Music is a web application built with ExpressJS, ReactJS, and the Spotify API.</p>
            </div>
        </div>
    )
}