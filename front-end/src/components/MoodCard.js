import './MoodCard.css'

export default function MoodCard({ img, text, makePlaylist }) {
    const styles = {
        background: `linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(${ img })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }
    return <div className="MoodCard" style={styles} onClick={makePlaylist}>
        <h3>{text}</h3>
    </div>
}