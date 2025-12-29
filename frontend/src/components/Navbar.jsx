import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">⚡ FlashTopUp</Link>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Link ke History */}
                <Link to="/history" style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '500' }}>
                    Riwayat
                </Link>

                <span className="promo">🔥 Promo</span>
            </div>
        </nav>
    )
}

export default Navbar