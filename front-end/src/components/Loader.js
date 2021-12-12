import './Loader.css'

export default function Loader({ message }) {
    return (
        <div className="Loader">
            <div className="Loader-loading"></div>
            <h1 className="Loader-message">{message}</h1>
        </div>
    )
}