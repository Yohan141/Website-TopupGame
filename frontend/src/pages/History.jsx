// FILE: src/pages/History.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function History() {
    const [history, setHistory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Ambil data dari LocalStorage saat halaman dibuka
        const data = localStorage.getItem('history')
        if (data) {
            setHistory(JSON.parse(data))
        }
    }, [])

    const clearHistory = () => {
        if (window.confirm('Hapus semua riwayat?')) {
            localStorage.removeItem('history')
            setHistory([])
        }
    }

    return (
        <div className="detail-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Riwayat Pembelian</h2>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        Hapus Semua
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
                    <p>Belum ada transaksi.</p>
                    <button className="btn-buy" style={{ marginTop: '20px', width: 'auto', padding: '10px 30px' }} onClick={() => navigate('/')}>
                        Mulai Belanja
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {history.map((trx, index) => (
                        <div key={index} className="form-section" style={{ marginBottom: 0, padding: '15px', borderLeft: '4px solid #22c55e' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{trx.date}</span>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px' }}>Sukses</span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <img src={trx.game.img} alt={trx.game.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0' }}>{trx.game.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>{trx.item.amount} - {trx.item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default History