import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiHome, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

const listings = [
  { id: 1, price: '$900/mo', address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: '0.5mi to UMass', verified: true, tag: '🔥 Popular' },
  { id: 2, price: '$750/mo', address: '45 Fearing St, Amherst', beds: 1, baths: 1, distance: '0.8mi to UMass', verified: true, tag: '✨ New' },
  { id: 3, price: '$1100/mo', address: '8 Meadow St, Amherst', beds: 3, baths: 2, distance: '1.2mi to UMass', verified: false, tag: '🏡 Spacious' },
  { id: 4, price: '$850/mo', address: '72 Lincoln Ave, Amherst', beds: 2, baths: 1, distance: '0.3mi to UMass', verified: true, tag: '📍 Near Campus' },
  { id: 5, price: '$650/mo', address: '15 Sunset Ave, Amherst', beds: 1, baths: 1, distance: '1.5mi to UMass', verified: false, tag: '💰 Best Value' },
  { id: 6, price: '$1200/mo', address: '33 Orchard St, Amherst', beds: 4, baths: 2, distance: '0.6mi to UMass', verified: true, tag: '👥 Great for Groups' },
]

const WARM = {
  primary: '#C45C2E',
  secondary: '#E8835A',
  light: '#FDF0EA',
  lighter: '#FFF8F4',
  text: '#2D1810',
  text2: '#8B6355',
  white: '#FFFFFF',
  green: '#2D9B6F',
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState({})
  const navigate = useNavigate()
  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', background: WARM.lighter, minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: WARM.white, padding: '0 48px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F5E6DF', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: WARM.primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiHome color="white" size={18} />
          </div>
          <span style={{ color: WARM.text, fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>Campus<span style={{ color: WARM.primary }}>Nest</span></span>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: WARM.light, padding: '6px', borderRadius: '14px' }}>
          {[['Browse', '/browse'], ['Roommates', '/roommates'], ['Post Listing', '/']].map(([link, path]) => (
            <span key={link} onClick={() => navigate(path)}
              style={{ padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: WARM.text2, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = WARM.white; e.target.style.color = WARM.primary }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = WARM.text2 }}>
              {link}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: `2px solid ${WARM.primary}`, color: WARM.primary, padding: '8px 20px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>
            Log In
          </button>
          <button onClick={() => navigate('/login')} style={{ background: WARM.primary, border: 'none', color: 'white', padding: '10px 22px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', boxShadow: '0 4px 12px rgba(196,92,46,0.3)' }}>
            Sign Up ✨
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, #3D1A0A 0%, ${WARM.primary} 50%, ${WARM.secondary} 100%)`, padding: '90px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '300px', height: '300px', background: 'rgba(255,200,150,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40px', left: '10%', width: '80px', height: '80px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '15%', width: '50px', height: '50px', background: 'rgba(255,200,150,0.15)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '30%', right: '8%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', color: 'white', fontWeight: '600', marginBottom: '20px' }}>
              🏠 UMass & Five College Students
            </div>
            <h1 style={{ color: 'white', fontSize: '52px', fontWeight: '900', margin: '0 0 16px', letterSpacing: '-2px', lineHeight: '1.1' }}>
              Find your cozy home<br />
              <span style={{ color: '#FFD4B8' }}>near campus 🏡</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', margin: '0 0 40px' }}>
              Verified listings • Trusted profiles • AI-powered matching
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', maxWidth: '580px', margin: '0 auto 48px', background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', padding: '6px' }}>
            <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center' }}>
              <FiSearch color={WARM.primary} size={20} />
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by address, price, bedrooms..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', padding: '12px 0', color: WARM.text, background: 'transparent' }} />
            <button onClick={() => navigate('/browse')} style={{ background: WARM.primary, color: 'white', border: 'none', padding: '12px 28px', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
              Search
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
            {[['500+', 'Active Listings', '🏘️'], ['1,200+', 'Students Housed', '🎓'], ['4.8★', 'Average Rating', '⭐']].map(([num, label, emoji]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '30px', fontWeight: '800' }}>{emoji} {num}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div style={{ background: `linear-gradient(135deg, #3D1A0A 0%, ${WARM.primary} 50%, ${WARM.secondary} 100%)`, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFF8F4" />
        </svg>
      </div>

      {/* Featured Listings */}
      <div style={{ padding: '64px 48px', background: WARM.lighter, backgroundImage: 'radial-gradient(circle, rgba(196,92,46,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: WARM.text, margin: '0 0 6px' }}>Featured Listings 🏠</h2>
            <p style={{ color: WARM.text2, margin: 0, fontSize: '15px' }}>Handpicked listings near UMass Amherst</p>
          </div>
          <span onClick={() => navigate('/browse')} style={{ color: WARM.primary, cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
            View all listings →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {listings.map((l, i) => (
            <motion.div key={l.id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => navigate('/browse')}
              style={{ background: WARM.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(196,92,46,0.08)', cursor: 'pointer', transition: 'all 0.25s', border: '1px solid #F5E6DF' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(196,92,46,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(196,92,46,0.08)' }}>
              <div style={{ height: '170px', background: `linear-gradient(135deg, #FDE8DC, #FBBF9A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ fontSize: '52px' }}>🏠</div>
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', color: WARM.primary, fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>
                  {l.tag}
                </div>
                <div onClick={e => { e.stopPropagation(); toggleLike(l.id) }}
                  style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <FiHeart size={16} fill={liked[l.id] ? '#C45C2E' : 'none'} color={liked[l.id] ? '#C45C2E' : '#999'} />
                </div>
                {l.verified && (
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: WARM.green, color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>
                    ✓ Verified
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: WARM.primary, marginBottom: '6px' }}>{l.price}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: WARM.text2, fontSize: '13px', marginBottom: '14px' }}>
                  <FiMapPin size={13} color={WARM.primary} /> {l.address}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[`${l.beds} bed`, `${l.baths} bath`, l.distance].map(tag => (
                    <span key={tag} style={{ background: WARM.light, color: WARM.primary, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave Divider 2 */}
      <div style={{ background: WARM.lighter, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill={WARM.light} />
        </svg>
      </div>

      {/* Why CampusNest */}
      <div style={{ background: WARM.light, padding: '64px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: WARM.text, margin: '0 0 8px' }}>Why students love CampusNest 💛</h2>
        <p style={{ color: WARM.text2, marginBottom: '48px', fontSize: '16px' }}>Built with care for UMass & Five College students</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '🔒', title: 'Verified Listings', desc: 'Social media linked profiles for trusted connections' },
            { icon: '🤖', title: 'AI Roommate Match', desc: 'Find compatible roommates based on your lifestyle' },
            { icon: '📄', title: 'AI Lease Review', desc: 'Upload your lease and get instant red flag alerts' },
          ].map(f => (
            <div key={f.title} style={{ background: WARM.white, borderRadius: '20px', padding: '32px 24px', border: '1px solid #F5E6DF', boxShadow: '0 2px 12px rgba(196,92,46,0.06)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.icon}</div>
              <div style={{ color: WARM.text, fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: WARM.text2, fontSize: '14px', lineHeight: '1.7' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ background: WARM.primary, padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: '0 0 12px' }}>Ready to find your home? 🏡</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', fontSize: '16px' }}>Join 1,200+ UMass students already using CampusNest</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/browse')} style={{ background: 'white', color: WARM.primary, border: 'none', padding: '14px 32px', borderRadius: '14px', cursor: 'pointer', fontSize: '16px', fontWeight: '700' }}>
              Browse Listings
            </button>
            <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: 'white', border: '2px solid white', padding: '14px 32px', borderRadius: '14px', cursor: 'pointer', fontSize: '16px', fontWeight: '700' }}>
              Sign Up Free
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1A0A05', padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: WARM.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiHome color="white" size={14} />
          </div>
          <span style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>CampusNest</span>
        </div>
        <span style={{ color: '#8B6355', fontSize: '13px' }}>© 2026 CampusNest — Built for UMass Amherst & Five College Students 🏡</span>
      </div>

    </div>
  )
}