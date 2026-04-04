import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiMapPin, FiBookmark, FiUsers, FiUser, FiSettings, FiTrash2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

const savedListings = [
  { id: 1, price: '$900/mo', address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: '0.5mi to UMass', verified: true, notes: 'Great location, close to campus!' },
  { id: 2, price: '$750/mo', address: '45 Fearing St, Amherst', beds: 1, baths: 1, distance: '0.8mi to UMass', verified: true, notes: '' },
  { id: 3, price: '$1100/mo', address: '8 Meadow St, Amherst', beds: 3, baths: 2, distance: '1.2mi to UMass', verified: false, notes: 'Need to check with roommates' },
]

const savedRoommates = [
  { id: 1, name: 'Sara A.', major: 'Computer Science', year: 'Junior', budget: '$700-900/mo', color: '#4472C4' },
  { id: 2, name: 'Maya R.', major: 'Biology', year: 'Sophomore', budget: '$600-800/mo', color: '#993556' },
]

const menuItems = [
  { icon: <FiBookmark size={16} />, label: 'Saved Listings' },
  { icon: <FiUsers size={16} />, label: 'Saved Roommates' },
  { icon: <FiHome size={16} />, label: 'My Listings' },
  { icon: <FiUser size={16} />, label: 'My Profile' },
  { icon: <FiSettings size={16} />, label: 'Settings' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Saved Listings')
  const [listings, setListings] = useState(savedListings)
  const [roommates, setRoommates] = useState(savedRoommates)

  const removeListings = id => setListings(listings.filter(l => l.id !== id))
  const removeRoommate = id => setRoommates(roommates.filter(r => r.id !== id))

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f8f6', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: '#1F3864', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <FiHome color="white" size={22} />
          <span style={{ color: 'white', fontSize: '22px', fontWeight: '700' }}>CampusNest</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Browse', 'Roommates'].map(link => (
            <span key={link} onClick={() => navigate('/' + link.toLowerCase())}
              style={{ color: '#aac4e8', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
              {link}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4472C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'white' }}>SA</div>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Hi, Sammam 👋</span>
        </div>
      </nav>

      <div style={{ display: 'flex', gap: '24px', padding: '32px 40px' }}>

        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            {/* Profile */}
            <div style={{ textAlign: 'center', padding: '16px 0 20px', borderBottom: '1px solid #f0f0f0', marginBottom: '12px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#4472C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: 'white', margin: '0 auto 10px' }}>SA</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#1F3864' }}>Sammam Ariyana</div>
              <div style={{ fontSize: '12px', color: '#888' }}>sammam@umass.edu</div>
            </div>
            {menuItems.map(item => (
              <div key={item.label} onClick={() => setActiveTab(item.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', marginBottom: '4px', transition: 'all 0.2s',
                  background: activeTab === item.label ? '#e8f0fe' : 'transparent',
                  color: activeTab === item.label ? '#1F3864' : '#666',
                  fontWeight: activeTab === item.label ? '600' : '400' }}>
                {item.icon}
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>

          {/* Saved Listings Tab */}
          {activeTab === 'Saved Listings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1F3864', margin: '0 0 20px' }}>
                Saved Listings ({listings.length})
              </h2>
              {listings.map((l, i) => (
                <motion.div key={l.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '64px', borderRadius: '10px', background: 'linear-gradient(135deg, #D5E8F0, #B5D4F4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiHome size={24} color="#4472C4" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1F3864' }}>{l.price}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '13px', margin: '4px 0' }}>
                      <FiMapPin size={12} /> {l.address}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[`${l.beds} bed`, `${l.baths} bath`, l.distance].map(tag => (
                        <span key={tag} style={{ background: '#f0f4ff', color: '#4472C4', fontSize: '11px', padding: '2px 8px', borderRadius: '20px' }}>{tag}</span>
                      ))}
                      {l.verified && <span style={{ background: '#e8f8f3', color: '#1D9E75', fontSize: '11px', padding: '2px 8px', borderRadius: '20px' }}>✓ Verified</span>}
                    </div>
                    {l.notes && <div style={{ marginTop: '8px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>📝 {l.notes}</div>}
                  </div>
                  <button onClick={() => removeListings(l.id)}
                    style={{ background: '#fff0f0', border: 'none', color: '#C00000', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                    <FiTrash2 size={14} /> Remove
                  </button>
                </motion.div>
              ))}
              {listings.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>No saved listings yet</div>
                  <button onClick={() => navigate('/browse')} style={{ marginTop: '16px', background: '#1F3864', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Browse Listings</button>
                </div>
              )}
            </motion.div>
          )}

          {/* Saved Roommates Tab */}
          {activeTab === 'Saved Roommates' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1F3864', margin: '0 0 20px' }}>
                Saved Roommates ({roommates.length})
              </h2>
              {roommates.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1F3864' }}>{r.name}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{r.major} · {r.year}</div>
                    <span style={{ background: '#f0f4ff', color: '#4472C4', fontSize: '11px', padding: '2px 8px', borderRadius: '20px', marginTop: '6px', display: 'inline-block' }}>{r.budget}</span>
                  </div>
                  <button onClick={() => removeRoommate(r.id)}
                    style={{ background: '#fff0f0', border: 'none', color: '#C00000', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                    <FiTrash2 size={14} /> Remove
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Other tabs */}
          {!['Saved Listings', 'Saved Roommates'].includes(activeTab) && (
            <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>Coming Soon</div>
              <div style={{ fontSize: '14px', marginTop: '8px' }}>This feature is under development</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}