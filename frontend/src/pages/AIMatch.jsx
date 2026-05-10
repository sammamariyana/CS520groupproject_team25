import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiZap, FiCheckCircle, FiArrowRight, FiArrowLeft,
  FiShield, FiMessageCircle,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'

const avatarColors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500']

const mockMatches = [
  { id: 1, name: 'Sara A.', major: 'Computer Science', year: 'Junior',   score: 94, budget: '$700–900',  sleep: 'Early riser', clean: 'Spotless', noise: 'Quiet',    fb: true,  ig: true,  snap: false, bio: 'Studious and tidy. Loves hiking and home cooking. Roommate of 2 years said I\'m the best.' },
  { id: 2, name: 'Maya R.', major: 'Biology',           year: 'Sophomore', score: 88, budget: '$600–800',  sleep: 'Early riser', clean: 'Very clean', noise: 'Quiet', fb: true,  ig: true,  snap: true,  bio: 'Pre-med, organized, respectful of shared space. Into plants and meal prep.' },
  { id: 3, name: 'Aisha M.',major: 'Psychology',        year: 'Junior',   score: 82, budget: '$700–850',  sleep: 'Early riser', clean: 'Clean',    noise: 'Quiet',    fb: true,  ig: true,  snap: true,  bio: 'Friendly and social but very respectful of study time. Great communicator.' },
]

const reasonMap = {
  94: ['Same sleep schedule', 'Both prefer quiet living', 'Matching budget range', 'Similar cleanliness standards'],
  88: ['Similar wake-up times', 'Both keep spaces tidy', 'Budget overlap', 'Shared study-at-home habit'],
  82: ['Compatible sleep times', 'Both rated noise: quiet', 'Budget fits your range', 'Both pet-friendly'],
}

const steps = ['Basics', 'Lifestyle', 'Preferences']

const initialForm = {
  budgetMin: '700', budgetMax: '900', moveIn: '',
  sleep: '', wakeUp: '',
  cleanliness: 3, noise: 2,
  smoking: 'No', pets: 'No', guests: 'Sometimes', studyPlace: 'Mix',
  hobbies: [],
}

const hobbyOptions = ['Cooking', 'Gaming', 'Fitness', 'Music', 'Reading', 'Outdoors', 'Art', 'Sports']

export default function AIMatch() {
  const navigate = useNavigate()
  const [step, setStep]           = useState(0)
  const [form, setForm]           = useState(initialForm)
  const [isAnalyzing, setAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleHobby = h => set('hobbies', form.hobbies.includes(h) ? form.hobbies.filter(x => x !== h) : [...form.hobbies, h])

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setShowResults(true) }, 2200)
  }

  const cleanLabel  = n => ['', 'Messy', 'Casual', 'Tidy', 'Clean', 'Spotless'][n]
  const noiseLabel  = n => ['', 'Very quiet', 'Quiet', 'Moderate', 'Social', 'Lively'][n]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-violet-900 to-indigo-900 py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-violet-700/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiZap className="text-white" size={28} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">AI Roommate Matching</h1>
          <p className="text-violet-300 text-lg">Answer a few questions — our AI finds your most compatible roommates</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <FiShield className="text-violet-400" size={14} />
            <span className="text-violet-400 text-sm">All personal info is anonymized before being sent to the AI model</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* ── Results ──────────────────────────────────────── */}
        {showResults ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Your Top Matches</h2>
                <p className="text-gray-500 text-sm mt-1">Based on your lifestyle preferences</p>
              </div>
              <button onClick={() => { setShowResults(false); setStep(0); setForm(initialForm) }}
                className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors">
                Retake quiz
              </button>
            </div>

            <div className="space-y-5">
              {mockMatches.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${avatarColors[i]} rounded-full flex items-center justify-center text-white font-extrabold text-base shrink-0`}>
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-lg">{m.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className={`w-2 h-2 rounded-full ${m.score >= 90 ? 'bg-emerald-500' : m.score >= 85 ? 'bg-blue-500' : 'bg-amber-500'}`} />
                          <span className={`font-extrabold text-lg ${m.score >= 90 ? 'text-emerald-600' : m.score >= 85 ? 'text-blue-600' : 'text-amber-600'}`}>
                            {m.score}% match
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">{m.major} · {m.year} · {m.budget}/mo</p>
                      <p className="text-gray-600 text-sm mt-2 mb-3">{m.bio}</p>

                      {/* Why you match */}
                      <div className="bg-gray-50 rounded-xl p-3 mb-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Why you match</p>
                        <div className="grid grid-cols-2 gap-1">
                          {reasonMap[m.score].map(r => (
                            <div key={r} className="flex items-center gap-1.5 text-xs text-gray-600">
                              <FiCheckCircle className="text-emerald-500 shrink-0" size={12} />
                              {r}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Social badges + action */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {m.fb   && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">FB</span>}
                          {m.ig   && <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">IG</span>}
                          {m.snap && <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">SC</span>}
                        </div>
                        <button
                          onClick={() => navigate('/roommates')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5"
                        >
                          <FiMessageCircle size={14} /> Message
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button onClick={() => navigate('/roommates')}
                className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto">
                Browse all roommate profiles <FiArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : isAnalyzing ? (
          /* ── Analyzing state ── */
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your preferences...</h3>
            <p className="text-gray-500 text-sm">Personal info is stripped. Matching on lifestyle factors only.</p>
          </div>
        ) : (
          /* ── Questionnaire ── */
          <>
            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i < step ? <FiCheckCircle size={14} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-violet-700' : 'text-gray-400'}`}>{s}</span>
                  {i < steps.length - 1 && <div className={`h-0.5 w-8 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

              {/* ── Step 0: Basics ── */}
              {step === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Basics</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Budget <span className="text-gray-400 font-normal">(/mo)</span></label>
                        <select value={form.budgetMin} onChange={e => set('budgetMin', e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500">
                          {['500','600','700','800','900','1000'].map(v => <option key={v}>${v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Budget <span className="text-gray-400 font-normal">(/mo)</span></label>
                        <select value={form.budgetMax} onChange={e => set('budgetMax', e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500">
                          {['700','800','900','1000','1100','1200'].map(v => <option key={v}>${v}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Move-in</label>
                      <div className="flex flex-wrap gap-2">
                        {['Jul 2026','Aug 2026','Sep 2026','Jan 2027'].map(d => (
                          <button key={d} onClick={() => set('moveIn', d)}
                            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                              form.moveIn === d ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-600 hover:border-violet-400'
                            }`}>{d}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 1: Lifestyle ── */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Lifestyle</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sleep schedule</label>
                      <div className="flex gap-3">
                        {[['Early', '🌅 Early riser'], ['Night owl', '🌙 Night owl']].map(([v, l]) => (
                          <button key={v} onClick={() => set('sleep', v)}
                            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                              form.sleep === v ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-600 hover:border-violet-400'
                            }`}>{l}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">Cleanliness</label>
                        <span className="text-violet-600 text-sm font-bold">{cleanLabel(form.cleanliness)}</span>
                      </div>
                      <input type="range" min="1" max="5" value={form.cleanliness} onChange={e => set('cleanliness', +e.target.value)}
                        className="w-full accent-violet-600" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Messy</span><span>Spotless</span></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">Noise level</label>
                        <span className="text-violet-600 text-sm font-bold">{noiseLabel(form.noise)}</span>
                      </div>
                      <input type="range" min="1" max="5" value={form.noise} onChange={e => set('noise', +e.target.value)}
                        className="w-full accent-violet-600" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Very quiet</span><span>Lively</span></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Preferences ── */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Preferences</h2>
                  <div className="space-y-5">
                    {[
                      ['Smoking', 'smoking', ['No', 'Outdoors only', 'Yes']],
                      ['Pets', 'pets', ['No', 'Cats OK', 'Dogs OK', 'All pets OK']],
                      ['Guests', 'guests', ['Rarely', 'Sometimes', 'Often']],
                      ['Study at', 'studyPlace', ['Home', 'Library', 'Mix']],
                    ].map(([label, key, opts]) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                        <div className="flex flex-wrap gap-2">
                          {opts.map(o => (
                            <button key={o} onClick={() => set(key, o)}
                              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                                form[key] === o ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-600 hover:border-violet-400'
                              }`}>{o}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hobbies <span className="text-gray-400 font-normal">(pick any)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {hobbyOptions.map(h => (
                          <button key={h} onClick={() => toggleHobby(h)}
                            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                              form.hobbies.includes(h) ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-600 hover:border-violet-400'
                            }`}>{h}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                    <FiArrowLeft size={15} /> Back
                  </button>
                )}
                {step < 2 ? (
                  <button onClick={() => setStep(s => s + 1)}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                    Continue <FiArrowRight size={15} />
                  </button>
                ) : (
                  <button onClick={handleAnalyze}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                    <FiZap size={16} /> Find My Matches
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
