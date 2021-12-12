import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <div className="NotFound">
            <div className="NotFound-container">
                <h1 className="NotFound-title">Page Not Found!</h1>
                <p className="NotFound-message">Sorry! This page either does not exist or was removed.</p>
                <img className="NotFound-gif" src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1639271460/MoodMusic/confused_pglxhf.gif" alt="confused" />
                <Link className="NotFound-btn" to="/">Back Home</Link>
            </div>
        </div>
    )
}