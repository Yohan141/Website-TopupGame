import { useState } from 'react'
import { games } from '../data/gamedata'
import GameCard from '../components/GameCard'

function Home() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <section className="hero">
                <h1>
                    Top Up Game <span>Termurah</span><br />
                    Proses <span>Instan</span>
                </h1>
                <p>Platform top up game otomatis #1 di Indonesia</p>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="🔍   Cari game (e.g., Mobile Legends)"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </section>

            <section className="game-grid">
                {filteredGames.map(game => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </section>
        </>
    )
}

export default Home