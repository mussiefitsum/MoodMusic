import './Error.css'
import { Link } from 'react-router-dom'

export default function Error({ message }) {
    return (
        <div className="Error">
            <div className="Error-alert">
                <h1>{message}</h1>
                <p>
                    Go back to our <Link to="/" style={{ textDecoration: 'none', color: '#F73859' }}>homepage</Link> and try logging in to Spotify again.
                </p>
                <i className="fas fa-frown"></i>
            </div>
        </div>
    )
}