import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="Navbar">
            <NavLink className="Navbar-icon" to="/">
                <img width="40px" src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1638405135/MoodMusic/cd-player_juvzsv.png" alt="" />
            </NavLink>
            <NavLink className="Navbar-link" to="/about">
                About
            </NavLink>
        </div>
    )
}