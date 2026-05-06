import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBookmark, FiUsers, FiHome, FiUser, FiSettings, FiFlag,
  FiTrash2, FiMapPin, FiEdit2, FiCheckCircle, FiPlusCircle,
  FiBell, FiLock, FiLink,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'

/* ── Mock data ─────────────────────────────────────────── */
const initListings = [
  { id: 1, price: '$900/mo', address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: '0.5mi', verified: true,  notes: 'Great location, close to campus!' },
  { id: 2, price: '$750/mo', address: '45 Fearing St, Amherst',     beds: 1, baths: 1, distance: '0.8mi', verified: true,  notes: '' },
  { id: 3, price: '$1100/mo',address: '8 Meadow St, Amherst',       beds: 3, baths: 2, distance: '1.2mi', verified: false, notes: 'Need to check with roommates' },
]
const initRoommates = [
  { id: 1, name: 'Sara A.', major: 'Computer Science', year: 'Junior',    budget: '$700–900/mo',  color: 'bg-blue-500',  notes: '' },
  { id: 2, name: 'Maya R.', major: 'Biology',          year: 'Sophomore', budget: '$600–800/mo',  color: 'bg-violet-500', notes: 'Very organized, great fit!' },
]
const initMyListings = [
  { id: 1, price: '$850/mo', address: '72 Lincoln Ave, Amherst', beds: 2, baths: 1, status: 'Active', views: 34 },
]
const initReports = [
  { id: 1, type: 'Listing',  subject: '99 Main St, Amherst', reason: 'Scam / fraudulent listing', date: 'May 2, 2026', status: 'Under review' },
  { id: 2, type: 'Profile', subject: 'Jordan T.', reason: 'Fake or impersonation account', date: 'Apr 28, 2026', status: 'Resolved' },
]

const menuItems = [
  { key: 'listings',  icon: FiBookmark, label: 'Saved Listings' },
  { key: 'roommates', icon: FiUsers,    label: 'Saved Roommates' },
  { key: 'mylistings',icon: FiHome,     label: 'My Listings' },
  { key: 'profile',   icon: FiUser,     label: 'My Profile' },
  { key: 'settings',  icon: FiSettings, label: 'Settings' },
  { key: 'reports',   icon: FiFlag,     label: 'Reports' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState('listings')
  const [listings, setListings]     = useState(initListings)
  const [roommates, setRoommates]   = useState(initRoommates)
  const [myListings, setMyListings] = useState(initMyListings)
  const [editNote, setEditNote]     = useState(null)
  const [noteValue, setNoteValue]   = useState('')
  const [social, setSocial] = useState({ fb: false, ig: true, snap: false })

  const removeListings = id => setListings(l => l.filter(x => x.id !== id))
  const removeRoommate = id => setRoommates(r => r.filter(x => x.id !== id))
  const removeMyListing = id => setMyListings(l => l.filter(x => x.id !== id))
  const saveNote = (id, isListing) => {
    if (isListing) setListings(l => l.map(x => x.id === id ? { ...x, notes: noteValue } : x))
    else setRoommates(r => r.map(x => x.id === id ? { ...x, notes: noteValue } : x))
    setEditNote(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-7">

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* User card */}
            <div className="bg-blue-900 px-5 py-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-3">
                SA
              </div>
              <p className="text-white font-bold text-sm">Sammam Ariyana</p>
              <p className="text-blue-300 text-xs mt-0.5">sammam@umass.edu</p>
            </div>
            {/* Menu */}
            <div className="p-2">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                    active === item.key
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={16} className={active === item.key ? 'text-blue-600' : 'text-gray-400'} />
                  {item.label}
                  {item.key === 'reports' && (
                    <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">2</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>

              {/* ── SAVED LISTINGS ── */}
              {active === 'listings' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Listings ({listings.length})</h2>
                    <button onClick={() => navigate('/browse')}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                      <FiPlusCircle size={15} /> Browse more
                    </button>
                  </div>
                  {listings.length === 0 ? (
                    <Empty icon={FiBookmark} text="No saved listings" sub="Browse listings and tap the bookmark icon to save them here." action={{ label: 'Browse Listings', onClick: () => navigate('/browse') }} />
                  ) : (
                    <div className="space-y-4">
                      {listings.map(l => (
                        <div key={l.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start">
                          <div className="w-20 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shrink-0">
                            <FiHome size={24} className="text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-lg font-extrabold text-blue-700">{l.price}</span>
                                {l.verified && <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">✓ Verified</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5 mb-2">
                              <FiMapPin size={12} className="text-blue-400 shrink-0" /> {l.address}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {[`${l.beds} bed`, `${l.baths} bath`, l.distance].map(t => (
                                <span key={t} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
                              ))}
                            </div>
                            {editNote === `l${l.id}` ? (
                              <div className="flex gap-2 mt-2">
                                <input value={noteValue} onChange={e => setNoteValue(e.target.value)}
                                  placeholder="Add a note..."
                                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button onClick={() => saveNote(l.id, true)}
                                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700">Save</button>
                                <button onClick={() => setEditNote(null)} className="text-gray-400 hover:text-gray-600 text-xs px-2">Cancel</button>
                              </div>
                            ) : (
                              <button onClick={() => { setEditNote(`l${l.id}`); setNoteValue(l.notes) }}
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors mt-1">
                                <FiEdit2 size={11} />
                                {l.notes ? <span className="italic text-gray-500">"{l.notes}"</span> : 'Add a note...'}
                              </button>
                            )}
                          </div>
                          <button onClick={() => removeListings(l.id)}
                            className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── SAVED ROOMMATES ── */}
              {active === 'roommates' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Roommates ({roommates.length})</h2>
                    <button onClick={() => navigate('/roommates')}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                      <FiPlusCircle size={15} /> Find more
                    </button>
                  </div>
                  {roommates.length === 0 ? (
                    <Empty icon={FiUsers} text="No saved roommates" sub="Browse roommate profiles and save ones you like." action={{ label: 'Find Roommates', onClick: () => navigate('/roommates') }} />
                  ) : (
                    <div className="space-y-4">
                      {roommates.map(r => (
                        <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start">
                          <div className={`w-12 h-12 ${r.color} rounded-full flex items-center justify-center text-white font-extrabold text-base shrink-0`}>
                            {r.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900">{r.name}</p>
                            <p className="text-gray-500 text-sm">{r.major} · {r.year}</p>
                            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block">{r.budget}</span>
                            {editNote === `r${r.id}` ? (
                              <div className="flex gap-2 mt-2">
                                <input value={noteValue} onChange={e => setNoteValue(e.target.value)}
                                  placeholder="Add a note..."
                                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button onClick={() => saveNote(r.id, false)}
                                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700">Save</button>
                                <button onClick={() => setEditNote(null)} className="text-gray-400 hover:text-gray-600 text-xs px-2">Cancel</button>
                              </div>
                            ) : (
                              <button onClick={() => { setEditNote(`r${r.id}`); setNoteValue(r.notes) }}
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors mt-1.5">
                                <FiEdit2 size={11} />
                                {r.notes ? <span className="italic text-gray-500">"{r.notes}"</span> : 'Add a note...'}
                              </button>
                            )}
                          </div>
                          <button onClick={() => removeRoommate(r.id)}
                            className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── MY LISTINGS ── */}
              {active === 'mylistings' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                    <button onClick={() => navigate('/post-listing')}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                      <FiPlusCircle size={15} /> Post New Listing
                    </button>
                  </div>
                  {myListings.length === 0 ? (
                    <Empty icon={FiHome} text="No listings posted" sub="Post your first listing to attract student tenants." action={{ label: 'Post a Listing', onClick: () => navigate('/post-listing') }} />
                  ) : (
                    <div className="space-y-4">
                      {myListings.map(l => (
                        <div key={l.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-center">
                          <div className="w-20 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shrink-0">
                            <FiHome size={24} className="text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-lg font-extrabold text-blue-700">{l.price}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${l.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                {l.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-1">
                              <FiMapPin size={12} /> {l.address}
                            </div>
                            <p className="text-xs text-gray-400">{l.beds} bed · {l.baths} bath · {l.views} views</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">Edit</button>
                            <button onClick={() => removeMyListing(l.id)}
                              className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── MY PROFILE ── */}
              {active === 'profile' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                  <div className="space-y-5">
                    {/* Basic info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                        <FiUser className="text-blue-600" size={17} /> Personal Info
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[['Full Name', 'Sammam Ariyana'], ['University Email', 'sammam@umass.edu'], ['Major', 'Computer Science'], ['Year', 'Junior'], ['University', 'UMass Amherst']].map(([l, v]) => (
                          <div key={l}>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{l}</label>
                            <input defaultValue={v}
                              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                        Save Changes
                      </button>
                    </div>

                    {/* Social media */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-base">
                        <FiLink className="text-blue-600" size={17} /> Social Media Trust Badges
                      </h3>
                      <p className="text-gray-500 text-sm mb-5">Connect accounts to earn verified trust badges on your profile and listings.</p>
                      <div className="space-y-3">
                        {[
                          { key: 'fb',   label: 'Facebook',  bg: 'bg-blue-600', connected: social.fb },
                          { key: 'ig',   label: 'Instagram', bg: 'bg-gradient-to-r from-pink-500 to-orange-400', connected: social.ig },
                          { key: 'snap', label: 'Snapchat',  bg: 'bg-yellow-400', connected: social.snap, dark: true },
                        ].map(s => (
                          <div key={s.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className={`${s.bg} w-9 h-9 rounded-lg flex items-center justify-center`}>
                                <FiLink className={s.dark ? 'text-gray-900' : 'text-white'} size={14} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                                <p className="text-xs text-gray-400">{s.connected ? 'Connected' : 'Not connected'}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSocial(prev => ({ ...prev, [s.key]: !prev[s.key] }))}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                s.connected
                                  ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {s.connected ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ── SETTINGS ── */}
              {active === 'settings' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  <div className="space-y-5">
                    {/* Notifications */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                        <FiBell className="text-blue-600" size={17} /> Notifications
                      </h3>
                      {[
                        ['New listing matches', 'When a listing matches your saved search criteria', true],
                        ['Roommate messages', 'When someone sends you a message', true],
                        ['Listing updates', 'When a saved listing changes price or availability', false],
                        ['AI match results', 'When new compatible roommate profiles appear', true],
                      ].map(([title, desc, defaultOn]) => (
                        <ToggleRow key={title} title={title} desc={desc} defaultOn={defaultOn} />
                      ))}
                    </div>
                    {/* Privacy */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                        <FiLock className="text-blue-600" size={17} /> Privacy
                      </h3>
                      {[
                        ['Show profile in roommate search', 'Let other students see your roommate profile', true],
                        ['Show social trust badges', 'Display connected social accounts as badges', true],
                        ['Allow messages from all students', 'If off, only your saved contacts can message you', false],
                      ].map(([title, desc, defaultOn]) => (
                        <ToggleRow key={title} title={title} desc={desc} defaultOn={defaultOn} />
                      ))}
                    </div>
                    {/* Danger zone */}
                    <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                      <h3 className="font-bold text-red-800 mb-3 text-base">Danger Zone</h3>
                      <p className="text-red-600 text-sm mb-4">These actions are permanent and cannot be undone.</p>
                      <div className="flex gap-3">
                        <button className="border border-red-300 text-red-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-red-100 transition-colors">
                          Deactivate Account
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ── REPORTS ── */}
              {active === 'reports' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reports</h2>
                  <div className="space-y-4">
                    {initReports.map(r => (
                      <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{r.type}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>{r.status}</span>
                            </div>
                            <p className="font-bold text-gray-900 text-sm">{r.subject}</p>
                            <p className="text-gray-500 text-sm mt-0.5">{r.reason}</p>
                            <p className="text-gray-400 text-xs mt-1">Submitted {r.date}</p>
                          </div>
                          {r.status === 'Resolved' && (
                            <FiCheckCircle className="text-emerald-500 shrink-0" size={20} />
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-4">
                      <p className="text-gray-400 text-sm">See something suspicious?</p>
                      <button onClick={() => navigate('/browse')}
                        className="text-blue-600 font-semibold text-sm hover:underline mt-1">
                        Browse listings to report →
                      </button>
                    </div>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ── Helper components ─────────────────────────────────── */
function Empty({ icon: Icon, text, sub, action }) {
  return (
    <div className="text-center py-20">
      <Icon size={48} className="mx-auto text-gray-200 mb-4" />
      <p className="font-bold text-gray-600 text-lg">{text}</p>
      <p className="text-gray-400 text-sm mt-1 mb-6">{sub}</p>
      {action && (
        <button onClick={action.onClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
          {action.label}
        </button>
      )}
    </div>
  )
}

function ToggleRow({ title, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="pr-4">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
      <div onClick={() => setOn(!on)}
        className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${on ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </div>
    </div>
  )
}
