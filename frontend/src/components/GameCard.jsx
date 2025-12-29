import { Link } from 'react-router-dom'

function GameCard({ game }) {
    return (
        <Link to={`/topup/${game.slug}`} className="game-card">
            <img src={game.img} alt={game.name} />

            {/* Overlay sesuai style di App.css */}
            <div className="overlay">
                <span>{game.name}</span>
            </div>
        </Link>
    )
}

export default GameCard