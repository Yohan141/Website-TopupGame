import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Payment() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState(null)

    // 1. SAFEGUARD: Jika user buka link langsung tanpa data, tendang ke Home
    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [state, navigate])

    // Jika data belum ada (sedang redirect), jangan tampilkan apa-apa biar rapi
    if (!state) return null

    const { game, userId, zoneId, item } = state

    // Data dummy metode pembayaran
    const methods = [
        { id: 'qris', name: 'QRIS (Semua E-Wallet)', fee: 0 },
        { id: 'dana', name: 'DANA', fee: 0 },
        { id: 'gopay', name: 'GoPay', fee: 1000 },
        { id: 'ovo', name: 'OVO', fee: 1000 },
    ]

    const handleConfirm = () => {
        if (!paymentMethod) {
            alert('Silakan pilih metode pembayaran!')
            return
        }

        // Konfirmasi akhir sebelum "transaksi"
        const confirm = window.confirm(`Konfirmasi pembayaran sebesar ${item.price}?`)

        if (confirm) {
            // Data waktu transaksi untuk struk
            const now = new Date().toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'short'
            })

            // 2. NAVIGASI KE HALAMAN SUKSES
            // Kita kirim data transaksi ke halaman Success.jsx
            navigate('/success', {
                state: {
                    game: game,
                    item: item,
                    userId: userId,
                    zoneId: zoneId,
                    paymentMethod: paymentMethod,
                    date: now
                }
            })
        }
    }

    return (
        <div className="detail-container">
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Konfirmasi Pembayaran</h2>

            {/* Section 1: Ringkasan Pesanan */}
            <div className="form-section">
                <label className="label-section">Ringkasan Pesanan</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                    <img src={game.img} alt={game.name} style={{ width: '80px', borderRadius: '10px' }} />
                    <div>
                        <h3 style={{ margin: 0 }}>{game.name}</h3>
                        <p style={{ margin: '5px 0 0', color: '#a5b4fc' }}>{item.amount}</p>
                    </div>
                </div>

                <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8' }}>User ID</span>
                        <span>{userId} {zoneId ? `(${zoneId})` : ''}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Harga</span>
                        <span style={{ fontWeight: 'bold', color: '#fff' }}>{item.price}</span>
                    </div>
                </div>
            </div>

            {/* Section 2: Pilih Metode Pembayaran */}
            <div className="form-section">
                <label className="label-section">Pilih Pembayaran</label>
                <div className="grid-nominal">
                    {methods.map(method => (
                        <div
                            key={method.id}
                            className={`nominal-item ${paymentMethod === method.id ? 'active' : ''}`}
                            onClick={() => setPaymentMethod(method.id)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <span style={{ fontWeight: 'bold' }}>{method.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 3: Total & Tombol Bayar */}
            <div className="form-section" style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontSize: '1.1rem' }}>Total Bayar</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a5b4fc' }}>{item.price}</span>
                </div>
                <button className="btn-buy" onClick={handleConfirm}>
                    BAYAR SEKARANG
                </button>
            </div>
        </div>
    )
}

export default Payment