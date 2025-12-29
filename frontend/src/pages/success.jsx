import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Success() {
    const { state } = useLocation()
    const navigate = useNavigate()
    // useRef untuk memastikan penyimpanan hanya jalan 1 kali (mencegah duplikat saat React StrictMode)
    const isSaved = useRef(false)

    useEffect(() => {
        if (!state) {
            navigate('/')
            return
        }

        // LOGIKA PENYIMPANAN KE LOCALSTORAGE
        if (!isSaved.current) {
            // 1. Ambil data lama (jika ada)
            const existingHistory = JSON.parse(localStorage.getItem('history')) || []

            // 2. Tambahkan data baru ke paling atas
            const newHistory = [state, ...existingHistory]

            // 3. Simpan kembali
            localStorage.setItem('history', JSON.stringify(newHistory))

            isSaved.current = true
        }

    }, [state, navigate])

    if (!state) return null

    const { game, item, userId, zoneId, paymentMethod, date } = state

    return (
        <div className="detail-container" style={{ textAlign: 'center' }}>
            {/* ... (Bagian Tampilan Struk SAMA SEPERTI SEBELUMNYA) ... */}

            {/* Animasi Icon Sukses */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    width: '80px', height: '80px', background: '#22c55e', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Pembayaran Berhasil!</h2>
                <p style={{ color: '#a5b4fc' }}>Diamond sedang dikirim ke akunmu.</p>
            </div>

            {/* Struk Detail */}
            <div className="form-section" style={{ textAlign: 'left' }}>
                <h3 style={{ borderBottom: '1px dashed #475569', paddingBottom: '15px', marginBottom: '15px' }}>
                    Detail Transaksi
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Waktu</span>
                    <span>{date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Game</span>
                    <span>{game.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Item</span>
                    <span>{item.amount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>ID Player</span>
                    <span>{userId} {zoneId ? `(${zoneId})` : ''}</span>
                </div>

                <div style={{ borderTop: '1px dashed #475569', paddingTop: '15px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem' }}>Total Bayar</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#a5b4fc' }}>{item.price}</span>
                </div>
            </div>

            <button className="btn-buy" onClick={() => navigate('/')}>
                BELI LAGI
            </button>

            {/* Tombol pintas ke History */}
            <button
                style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', marginTop: '15px', padding: '15px', width: '100%', borderRadius: '50px', cursor: 'pointer' }}
                onClick={() => navigate('/history')}
            >
                LIHAT RIWAYAT
            </button>
        </div>
    )
}

export default Success