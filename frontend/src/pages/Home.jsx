import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch, FiMapPin, FiHome, FiUsers, FiShield, FiBookmark,
  FiFlag, FiZap, FiFileText, FiArrowRight, FiCheckCircle, FiUser,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'

const features = [
  { icon: FiUser,      title: 'Student Auth',          desc: 'Sign up with your .edu email for a verified, trusted account.',          color: 'bg-blue-50 text-blue-600',    path: '/login' },
  { icon: FiHome,      title: 'Housing Listings',      desc: 'Post and browse verified off-campus apartments near UMass.',             color: 'bg-emerald-50 text-emerald-600', path: '/browse' },
  { icon: FiShield,    title: 'Social Trust Badges',   desc: 'Link Facebook, Instagram & Snapchat to earn verified trust badges.',     color: 'bg-pink-50 text-pink-600',    path: '/roommates' },
  { icon: FiUsers,     title: 'Roommate Finder',       desc: 'Browse lifestyle-matched roommate profiles and start a conversation.',   color: 'bg-amber-50 text-amber-600',  path: '/roommates' },
  { icon: FiBookmark,  title: 'Saved Dashboard',       desc: 'Save listings and roommates with personal notes to your dashboard.',     color: 'bg-purple-50 text-purple-600', path: '/dashboard' },
  { icon: FiFlag,      title: 'Report & Moderate',     desc: 'Flag suspicious listings or profiles for admin review.',                 color: 'bg-red-50 text-red-600',      path: '/browse' },
  { icon: FiZap,       title: 'AI Roommate Match',     desc: 'Questionnaire-based AI matching on sleep, cleanliness, budget & more.', color: 'bg-violet-50 text-violet-600', path: '/ai-match' },
  { icon: FiFileText,  title: 'AI Lease Review',       desc: 'Upload your lease PDF — get plain-English summaries and red flags.',    color: 'bg-cyan-50 text-cyan-600',    path: '/lease-review' },
]

const listings = [
  { id: 1, price: 900,  address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: '0.5mi', verified: true,  tag: 'Popular' },
  { id: 2, price: 750,  address: '45 Fearing St, Amherst',     beds: 1, baths: 1, distance: '0.8mi', verified: true,  tag: 'New' },
  { id: 3, price: 1100, address: '8 Meadow St, Amherst',       beds: 3, baths: 2, distance: '1.2mi', verified: false, tag: 'Spacious' },
]

const steps = [
  { num: '1', title: 'Create your account',   desc: 'Sign up with your university email in under a minute.' },
  { num: '2', title: 'Browse or post',        desc: 'Search listings by price, location, and bedroom count.' },
  { num: '3', title: 'Connect & move in',     desc: 'Message verified students and sign with confidence.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-block bg-blue-800 text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-700">
              For UMass & Five College Students
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              Find your perfect<br />
              <span className="text-blue-300">off-campus home</span>
            </h1>
            <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Verified listings, AI-powered roommate matching, and lease review — all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-center px-4 text-gray-400 shrink-0">
              <FiSearch size={20} />
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate('/browse')}
              placeholder="Search by address, neighborhood, or price..."
              className="flex-1 py-4 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
            />
            <button
              onClick={() => navigate('/browse')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 transition-colors text-base shrink-0"
            >
              Search
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex justify-center gap-14"
          >
            {[['500+', 'Active Listings'], ['1,200+', 'Students Housed'], ['4.8★', 'Average Rating']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-white text-3xl font-extrabold">{num}</div>
                <div className="text-blue-300 text-sm mt-1 font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── All 8 Features ───────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Everything you need, in one platform</h2>
          <p className="text-gray-500 mt-3 text-lg">Eight powerful features built for UMass students</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => navigate(f.path)}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Listings ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
              <p className="text-gray-500 mt-2">Handpicked housing near UMass Amherst</p>
            </div>
            <button
              onClick={() => navigate('/browse')}
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
            >
              View all listings <FiArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => navigate('/browse')}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all cursor-pointer overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                  <FiHome size={52} className="text-blue-300" />
                  <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {l.tag}
                  </span>
                  {l.verified && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <FiCheckCircle size={11} /> Verified
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-2xl font-extrabold text-blue-700 mb-1">${l.price}<span className="text-base font-medium text-gray-400">/mo</span></div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <FiMapPin size={13} className="text-blue-400 shrink-0" /> {l.address}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[`${l.beds} bed`, `${l.baths} bath`, `${l.distance} to campus`].map(tag => (
                      <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Features Spotlight ─────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-violet-800 text-violet-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-violet-700">
              Powered by AI
            </span>
            <h2 className="text-3xl font-bold text-white">Smart tools for smarter decisions</h2>
            <p className="text-violet-300 mt-3 text-lg">AI-powered features designed with student privacy in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Match */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="bg-violet-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiZap className="text-white" size={28} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">AI Roommate Matching</h3>
              <p className="text-violet-200 mb-6 leading-relaxed text-sm">
                Complete a lifestyle questionnaire — sleep schedule, cleanliness, noise tolerance, budget — and our AI finds your most compatible matches. All personal data is anonymized before processing.
              </p>
              <ul className="space-y-2 mb-8">
                {['Sleep schedule & cleanliness compatibility', 'Noise tolerance & budget alignment', 'Hobby & lifestyle preferences', 'Privacy-first: PII stripped before AI'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-violet-200 text-sm">
                    <FiCheckCircle className="text-violet-400 shrink-0" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/ai-match')}
                className="bg-white text-violet-900 font-bold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors flex items-center gap-2 text-sm"
              >
                Find My Matches <FiArrowRight size={15} />
              </button>
            </div>

            {/* Lease Review */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="bg-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiFileText className="text-white" size={28} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">AI Lease Review</h3>
              <p className="text-violet-200 mb-6 leading-relaxed text-sm">
                Upload your lease PDF and get a plain-English summary of key clauses, payment terms, and potential red flags — before you sign. Personal information is stripped before analysis.
              </p>
              <ul className="space-y-2 mb-8">
                {['Plain-English clause summaries', 'Red flag & hidden fee detection', 'Payment term & deposit analysis', 'Anonymous: PII removed before AI'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-violet-200 text-sm">
                    <FiCheckCircle className="text-cyan-400 shrink-0" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/lease-review')}
                className="bg-white text-cyan-900 font-bold px-6 py-3 rounded-xl hover:bg-cyan-50 transition-colors flex items-center gap-2 text-sm"
              >
                Review My Lease <FiArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="text-gray-500 mb-12 text-lg">Get into your new home in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(s => (
              <div key={s.num} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to find your home?</h2>
          <p className="text-blue-100 text-lg mb-10">Join 1,200+ UMass students already using CampusNest</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/browse')}
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors"
            >
              Browse Listings
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-blue-700 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <FiHome className="text-white" size={16} />
            </div>
            <span className="text-white font-bold text-lg">CampusNest</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 CampusNest — Built for UMass Amherst & Five College Students</p>
        </div>
      </footer>
    </div>
  )
}
