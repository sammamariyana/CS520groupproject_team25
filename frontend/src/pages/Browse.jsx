import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiMapPin, FiSearch, FiSliders } from 'react-icons/fi'
import { motion } from 'framer-motion'

const allListings = [
  { id: 1, price: 900, address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: '0.5mi', verified: true, available: 'Aug 1' },
  { id: 2, price: 750, address: '45 Fearing St, Amherst', beds: 1, baths: 1, distance: '0.8mi', verified: true, available: 'Sep 1' },
  { id: 3, price: 1100, address: '8 Meadow St, Amherst', beds: 3, baths: 2, distance: '1.2mi', verified: false, available: 'Aug 15' },
  { id: 4, price: 850, address: '72 Lincoln Ave, Amherst', beds: 2, baths: 1, distance: '0.3mi', verified: true, available: 'Aug 1' },
  { id: 5, price: 650, address: '15 Sunset Ave, Amherst', beds: 1, baths: 1, distance: '1.5mi', verified: false, available: 'Jul 1' },
  { id: 6, price: 1200, address: '33 Orchard St, Amherst', beds: 4, baths: 2, distance: '0.6mi', verified: true, available: 'Aug 1' },
  { id: 7, price: 780, address: '90 College St, Amherst', beds: 2, baths: 1, distance: '0.4mi', verified: true, available: 'Sep 1' },
  { id: 8, price: 920, address: '14 Pine St, Amherst', beds: 3, baths: 1, distance: '0.9mi', verified: false, available: 'Aug 1' },
  { id: 9, price: 680, address: '5 Oak Ave, Amherst', beds: 1, baths: 1, distance: '1.1mi', verified: true, available: 'Jul 15' },
]

export default function Browse() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(1500)
  const [beds, setBeds] = useState('Any')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const filtered = allListings.filter(l => {
    const matchSearch = l.address.toLowerCase().includes(search.toLowerCase())
    const matchPrice = l.price <= maxPrice
    const matchBeds = beds === 'Any' || l.beds === parseInt(beds)
    const matchVerified = !verifiedOnly || l.verified
    return matchSearch && matchPrice && matchBeds && matchVerified
  })

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f8f6', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: '#1F3864', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <FiHome color="white" size={22} />
          <span style={{ color: 'white', fontSize: '22px', fontWeight: '700' }}>CampusNest</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Browse', 'Roommates', 'Post Listing'].map(link => (
            <span key={link} style={{ color: link === 'Browse' ? 'white' : '#aac4e8', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
              {link}
            </span>
          ))}
        </div>
        <button onClick={() => navigate('/login')} style={{ background: '#4472C4', border: 'none', color: 'white', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
          Sign In
        </button>
      </nav>

      <div style={{ display: 'flex', gap: '24px', padding: '24px 40px' }}>

        {/* Sidebar Filters */}
        <div style={{ width: '260px', flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <FiSliders color="#1F3864" size={18} />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#1F3864' }}>Filters</span>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Search</label>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} color="#888" size={14} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Address..."
                  style={{ width: '100%', padding: '8px 8px 8px 32px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Max Price */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>
                Max Price: <span style={{ color: '#4472C4' }}>${maxPrice}/mo</span>
              </label>
              <input type="range" min="500" max="1500" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#4472C4' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888' }}>
                <span>$500</span><span>$1500</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Bedrooms</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Any', '1', '2', '3', '4'].map(b => (
                  <button key={b} onClick={() => setBeds(b)}
                    style={{ padding: '6px 14px', borderRadius: '20px', border: '1.5px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'all 0.2s',
                      background: beds === b ? '#1F3864' : 'white',
                      borderColor: beds === b ? '#1F3864' : '#e0e0e0',
                      color: beds === b ? 'white' : '#444' }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="verified" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#4472C4' }} />
              <label htmlFor="verified" style={{ fontSize: '13px', fontWeight: '600', color: '#444', cursor: 'pointer' }}>Verified only</label>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1F3864', margin: 0 }}>
              {filtered.length} listings found
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {filtered.map((l, i) => (
              <motion.div key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ height: '140px', background: 'linear-gradient(135deg, #D5E8F0, #B5D4F4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <FiHome size={36} color="#4472C4" />
                  {l.verified && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#1D9E75', color: 'white', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px' }}>
                      ✓ Verified
                    </div>
                  )}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#1F3864', marginBottom: '4px' }}>${l.price}/mo</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                    <FiMapPin size={12} /> {l.address}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {[`${l.beds} bed`, `${l.baths} bath`, `${l.distance} to UMass`, `Available ${l.available}`].map(tag => (
                      <span key={tag} style={{ background: '#f0f4ff', color: '#4472C4', fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>No listings found</div>
              <div style={{ fontSize: '14px', marginTop: '8px' }}>Try adjusting your filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}