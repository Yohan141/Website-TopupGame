import { useParams, useNavigate } from 'react-router-dom' // Tambah useNavigate
import { useState } from 'react'
import { games } from '../data/gamedata'

function DetailGame() {
    const { slug } = useParams()
    const navigate = useNavigate() // Inisialisasi hook navigasi
    const game = games.find(g => g.slug === slug)

    const [selectedItem, setSelectedItem] = useState(null)
    const [userId, setUserId] = useState('')
    const [zoneId, setZoneId] = useState('')

    if (!game) return <p className="text-center mt-10">Game tidak ditemukan</p>

    const nominals = [
        { id: 1, amount: '3 Diamonds', price: 'Rp 1.500' },
        { id: 2, amount: '50 Diamonds', price: 'Rp 15.000' },
        { id: 3, amount: '100 Diamonds', price: 'Rp 30.000' },
        { id: 4, amount: '250 Diamonds', price: 'Rp 75.000' },
        { id: 5, amount: '500 Diamonds', price: 'Rp 150.000' },
        { id: 6, amount: '1000 Diamonds', price: 'Rp 300.000' },
    ]

    const handleBuy = () => {
        // Validasi input
        if (!userId || !selectedItem) {
            alert('Mohon lengkapi ID dan pilih nominal!')
            return
        }

        // Cari data nominal yang dipilih
        const itemData = nominals.find(n => n.id === selectedItem)

        // Pindah ke halaman Payment membawa data transaksi
        navigate('/payment', {
            state: {
                game: game,
                userId: userId,
                zoneId: zoneId,
                item: itemData
            }
        })
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <img src={game.img} alt={game.name} />
                <div className="game-info">
                    <h2>{game.name}</h2>
                    <p>⚡ Proses Otomatis 1 Detik</p>
                    <p>🛡️ Jaminan Aman 100%</p>
                </div>
            </div>

            <div className="form-section">
                <label className="label-section">1. Masukkan User ID</label>
                <div className="input-row">
                    <input
                        type="text"
                        className="input-id"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-id"
                        placeholder="Zone ID"
                        style={{ width: '40%' }}
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                    />
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>*Contoh: 12345678 (1234)</p>
            </div>

            <div className="form-section">
                <label className="label-section">2. Pilih Nominal</label>
                <div className="grid-nominal">
                    {nominals.map(item => (
                        <div
                            key={item.id}
                            className={`nominal-item ${selectedItem === item.id ? 'active' : ''}`}
                            onClick={() => setSelectedItem(item.id)}
                        >
                            <div className="nominal-amount">{item.amount}</div>
                            <div className="nominal-price">{item.price}</div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="btn-buy" onClick={handleBuy}>
                BELI SEKARANG
            </button>
        </div>
    )
}

export default DetailGame