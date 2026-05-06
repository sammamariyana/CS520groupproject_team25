import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageCircle, FiBookmark, FiFlag, FiZap, FiArrowRight,
  FiCheckCircle, FiX, FiPlusCircle, FiUser,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-pink-500', 'bg-cyan-600']

const roommates = [
  { id: 1, name: 'Sara A.',   major: 'Computer Science', year: 'Junior',    budget: '$700–900',  moveIn: 'Aug 2026', sleep: 'Early',    clean: 5, noise: 1, fb: true,  ig: true,  snap: false, bio: 'Looking for a quiet roommate near campus. I study a lot but love hanging out on weekends!' },
  { id: 2, name: 'Ben K.',    major: 'Electrical Eng.',  year: 'Senior',    budget: '$800–1000', moveIn: 'Sep 2026', sleep: 'Night owl', clean: 4, noise: 3, fb: false, ig: true,  snap: true,  bio: 'Chill guy, love music and cooking. Looking for someone easygoing.' },
  { id: 3, name: 'Maya R.',   major: 'Biology',           year: 'Sophomore', budget: '$600–800',  moveIn: 'Aug 2026', sleep: 'Early',    clean: 5, noise: 1, fb: true,  ig: true,  snap: true,  bio: 'Pre-med student, very organized. Need a clean and quiet living space.' },
  { id: 4, name: 'Tom J.',    major: 'Mathematics',       year: 'Graduate',  budget: '$900–1100', moveIn: 'Jul 2026', sleep: 'Night owl', clean: 3, noise: 3, fb: true,  ig: false, snap: false, bio: 'PhD student, usually busy with research. Looking for independent roommates.' },
  { id: 5, name: 'Aisha M.',  major: 'Psychology',        year: 'Junior',    budget: '$700–850',  moveIn: 'Aug 2026', sleep: 'Early',    clean: 4, noise: 2, fb: true,  ig: true,  snap: true,  bio: 'Friendly and social but respectful of study time. Love plants and cooking!' },
  { id: 6, name: 'Chris L.',  major: 'Economics',         year: 'Senior',    budget: '$850–1050', moveIn: 'Sep 2026', sleep: 'Night owl', clean: 4, noise: 3, fb: false, ig: true,  snap: true,  bio: 'Finance by day, gamer by night. Looking for a chill living situation.' },
]

const cleanLabel  = n => ['', 'Messy', 'Casual', 'Tidy', 'Clean', 'Spotless'][n]
const noiseLabel  = n => ['', 'Very quiet', 'Quiet', 'Moderate', 'Social', 'Lively'][n]

export default function Roommates() {
  const navigate = useNavigate()
  const [sleep, setSleep]     = useState('Any')
  const [budget, setBudget]   = useState('Any')
  const [clean, setClean]     = useState('Any')
  const [saved, setSaved]     = useState({})
  const [reported, setReported] = useState({})
  const [reportModal, setReportModal] = useState(null)
  const [reportReason, setReportReason] = useState('')
  const [messageModal, setMessageModal] = useState(null)
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState({})

  const filtered = roommates.filter(r => {
    const matchSleep  = sleep === 'Any' || r.sleep === sleep
    const matchBudget = budget === 'Any' || r.budget.startsWith(budget)
    const matchClean  = clean === 'Any' || r.clean >= parseInt(clean)
    return matchSleep && matchBudget && matchClean
  })

  const toggleSave = id => setSaved(s => ({ ...s, [id]: !s[id] }))
  const submitReport = () => {
    if (reportReason) { setReported(r => ({ ...r, [reportModal]: true })); setReportModal(null); setReportReason('') }
  }
  const sendMessage = () => {
    if (message.trim()) { setMessageSent(m => ({ ...m, [messageModal]: true })); setMessageModal(null); setMessage('') }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Find a Roommate</h1>
            <p className="text-blue-300 mt-1 text-sm">Connect with compatible UMass students</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm"
          >
            <FiPlusCircle size={18} /> Create My Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── AI Match Banner ──────────────────────────────── */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center">
              <FiZap className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Try AI Roommate Matching</h3>
              <p className="text-violet-200 text-sm">Answer a quick questionnaire and we'll find your most compatible matches.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/ai-match')}
            className="bg-white text-violet-800 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-violet-50 transition-colors flex items-center gap-2 shrink-0"
          >
            Get Matched <FiArrowRight size={15} />
          </button>
        </div>

        {/* ── Filters ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Sleep */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sleep Schedule</label>
              <div className="flex gap-2">
                {['Any', 'Early', 'Night owl'].map(s => (
                  <button key={s} onClick={() => setSleep(s)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      sleep === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-400'
                    }`}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="h-8 w-px bg-gray-100" />

            {/* Cleanliness */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Cleanliness</label>
              <div className="flex gap-2">
                {['Any', '3', '4', '5'].map(c => (
                  <button key={c} onClick={() => setClean(c)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      clean === c ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-400'
                    }`}
                  >{c === 'Any' ? 'Any' : cleanLabel(+c) + '+'}</button>
                ))}
              </div>
            </div>

            <div className="ml-auto text-sm text-gray-500">
              Showing <span className="font-bold text-blue-700">{filtered.length}</span> profiles
            </div>
          </div>
        </div>

        {/* ── Cards ─────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FiUser size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold text-gray-600">No profiles match your filters</p>
            <p className="text-sm mt-1">Try adjusting the sleep schedule or cleanliness filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6"
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white font-extrabold text-base shrink-0`}>
                      {r.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base">{r.name}</div>
                      <div className="text-gray-500 text-xs">{r.major} · {r.year}</div>
                    </div>
                  </div>
                  {/* Social badges */}
                  <div className="flex gap-1.5 shrink-0">
                    {r.fb   && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">FB</span>}
                    {r.ig   && <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">IG</span>}
                    {r.snap && <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">SC</span>}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{r.bio}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[r.budget + '/mo', r.moveIn, r.sleep === 'Early' ? '🌅 Early riser' : '🌙 Night owl', cleanLabel(r.clean), noiseLabel(r.noise)].map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  {messageSent[r.id] ? (
                    <span className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold py-2.5 rounded-xl">
                      <FiCheckCircle size={14} /> Message Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => setMessageModal(r.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle size={15} /> Message
                    </button>
                  )}
                  <button
                    onClick={() => toggleSave(r.id)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      saved[r.id] ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    <FiBookmark size={15} fill={saved[r.id] ? 'white' : 'none'} />
                  </button>
                  {!reported[r.id] ? (
                    <button
                      onClick={() => setReportModal(r.id)}
                      className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <FiFlag size={15} />
                    </button>
                  ) : (
                    <span className="p-2.5 text-gray-300"><FiCheckCircle size={15} /></span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Message Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {messageModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setMessageModal(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">
                  Message {roommates.find(r => r.id === messageModal)?.name}
                </h3>
                <button onClick={() => setMessageModal(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
              </div>
              <textarea
                value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Introduce yourself and let them know why you'd be a great roommate..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setMessageModal(null)}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={sendMessage} disabled={!message.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                  Send Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Report Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {reportModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setReportModal(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FiFlag className="text-red-500" /> Report Profile
                </h3>
                <button onClick={() => setReportModal(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
              </div>
              <div className="space-y-2 mb-5">
                {['Fake or impersonation account', 'Harassing behavior', 'Spam or scam', 'Inappropriate content', 'Other'].map(reason => (
                  <label key={reason} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-gray-50">
                    <input type="radio" name="r2" value={reason} checked={reportReason === reason} onChange={() => setReportReason(reason)} className="accent-blue-600" />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setReportModal(null)}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={submitReport} disabled={!reportReason}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm">Submit Report</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
