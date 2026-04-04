import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiMessageCircle, FiUser } from 'react-icons/fi'
import { motion } from 'framer-motion'

const roommates = [
  { id: 1, name: 'Sara A.', major: 'Computer Science', year: 'Junior', budget: '$700-900', moveIn: 'Aug 2026', sleep: 'Early sleeper', clean: 'Very clean', noise: 'Quiet', fb: true, ig: true, snap: false, bio: 'Looking for a quiet roommate near campus. I study a lot but love hanging out on weekends!' },
  { id: 2, name: 'Ben K.', major: 'Electrical Eng.', year: 'Senior', budget: '$800-1000', moveIn: 'Sep 2026', sleep: 'Night owl', clean: 'Clean', noise: 'Moderate', fb: false, ig: true, snap: true, bio: 'Chill guy, love music and cooking. Looking for someone easygoing.' },
  { id: 3, name: 'Maya R.', major: 'Biology', year: 'Sophomore', budget: '$600-800', moveIn: 'Aug 2026', sleep: 'Early sleeper', clean: 'Very clean', noise: 'Quiet', fb: true, ig: true, snap: true, bio: 'Pre-med student, very organized. Need a clean and quiet living space.' },
  { id: 4, name: 'Tom J.', major: 'Mathematics', year: 'Graduate', budget: '$900-1100', moveIn: 'Jul 2026', sleep: 'Night owl', clean: 'Moderate', noise: 'Moderate', fb: true, ig: false, snap: false, bio: 'PhD student, usually busy with research. Looking for independent roommates.' },
  { id: 5, name: 'Aisha M.', major: 'Psychology', year: 'Junior', budget: '$700-850', moveIn: 'Aug 2026', sleep: 'Early sleeper', clean: 'Clean', noise: 'Quiet', fb: true, ig: true, snap: true, bio: 'Friendly and social but respectful of study time. Love plants and cooking!' },
  { id: 6, name: 'Chris L.', major: 'Economics', year: 'Senior', budget: '$850-1050', moveIn: 'Sep 2026', sleep: 'Night owl', clean: 'Clean', noise: 'Moderate', fb: false, ig: true, snap: true, bio: 'Finance bro by day, gamer by night. Looking for a chill living situation.' },
]

const colors = ['#4472C4', '#1D9E75', '#993556', '#BA7517', '#534AB7', '#0F6E56']

export default function Roommates() {
  const navigate = useNavigate()
  const [budget, setBudget] = useState('Any')
  const [sleep, setSleep] = useState('Any')
  const [selected, setSelected] = useState(null)

  const filtered = roommates.filter(r => {
    const matchBudget = budget === 'Any' || r.budget.includes(budget.replace('$', ''))
    const matchSleep = sleep === 'Any' || r.sleep === sleep
    return matchBudget && matchSleep
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
            <span key={link} onClick={() => link === 'Browse' && navigate('/browse')}
              style={{ color: link === 'Roommates' ? 'white' : '#aac4e8', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
              {link}
            </span>
          ))}
        </div>
        <button onClick={() => navigate('/login')} style={{ background: '#4472C4', border: 'none', color: 'white', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
          Sign In
        </button>
      </nav>

      <div style={{ padding: '40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1F3864', margin: '0 0 8px' }}>Find a Roommate 🤝</h1>
            <p style={{ color: '#888', margin: 0 }}>Connect with compatible UMass students</p>
          </div>
          <button style={{ background: '#1F3864', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}>
            + Create My Profile
          </button>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Sleep Schedule</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Any', 'Early sleeper', 'Night owl'].map(s => (
                <button key={s} onClick={() => setSleep(s)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '1.5px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '500',
                    background: sleep === s ? '#1F3864' : 'white',
                    borderColor: sleep === s ? '#1F3864' : '#e0e0e0',
                    color: sleep === s ? 'white' : '#444' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: '40px', width: '1px', background: '#e0e0e0' }} />
          <div style={{ fontSize: '14px', color: '#888' }}>
            Showing <strong style={{ color: '#1F3864' }}>{filtered.length}</strong> roommates
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: colors[i % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1F3864' }}>{r.name}</div>
                  <div style={{ fontSize: '13px', color: '#888' }}>{r.major} · {r.year}</div>
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>{r.bio}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {[r.budget + '/mo', r.moveIn, r.sleep, r.clean, r.noise].map(tag => (
                  <span key={tag} style={{ background: '#f0f4ff', color: '#4472C4', fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>{tag}</span>
                ))}
              </div>

              {/* Social Badges */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {r.fb && <span style={{ background: '#1877F2', color: 'white', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>FB</span>}
                {r.ig && <span style={{ background: '#E1306C', color: 'white', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>IG</span>}
                {r.snap && <span style={{ background: '#FFFC00', color: '#333', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>SC</span>}
              </div>

              {/* Message Button */}
              <button style={{ width: '100%', padding: '10px', background: '#1F3864', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FiMessageCircle size={16} /> Message
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}