import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch, FiMapPin, FiHome, FiBookmark, FiFlag,
  FiCheckCircle, FiSliders, FiPlusCircle, FiX,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'

const allListings = [
  { id: 1,  price: 900,  address: '123 N Pleasant St, Amherst', beds: 2, baths: 1, distance: 0.5, verified: true,  available: 'Aug 1',  tag: 'Popular',     amenities: ['Parking', 'Laundry', 'AC'] },
  { id: 2,  price: 750,  address: '45 Fearing St, Amherst',     beds: 1, baths: 1, distance: 0.8, verified: true,  available: 'Sep 1',  tag: 'New',         amenities: ['Laundry', 'Heat'] },
  { id: 3,  price: 1100, address: '8 Meadow St, Amherst',       beds: 3, baths: 2, distance: 1.2, verified: false, available: 'Aug 15', tag: 'Spacious',    amenities: ['Parking', 'AC', 'Dishwasher'] },
  { id: 4,  price: 850,  address: '72 Lincoln Ave, Amherst',    beds: 2, baths: 1, distance: 0.3, verified: true,  available: 'Aug 1',  tag: 'Near Campus', amenities: ['Heat', 'Laundry'] },
  { id: 5,  price: 650,  address: '15 Sunset Ave, Amherst',     beds: 1, baths: 1, distance: 1.5, verified: false, available: 'Jul 1',  tag: 'Best Value',  amenities: ['AC'] },
  { id: 6,  price: 1200, address: '33 Orchard St, Amherst',     beds: 4, baths: 2, distance: 0.6, verified: true,  available: 'Aug 1',  tag: 'Group',       amenities: ['Parking', 'Laundry', 'AC', 'Dishwasher'] },
  { id: 7,  price: 780,  address: '90 College St, Amherst',     beds: 2, baths: 1, distance: 0.4, verified: true,  available: 'Sep 1',  tag: 'Cozy',        amenities: ['Laundry', 'Heat'] },
  { id: 8,  price: 920,  address: '14 Pine St, Amherst',        beds: 3, baths: 1, distance: 0.9, verified: false, available: 'Aug 1',  tag: 'Roomy',       amenities: ['Parking', 'AC'] },
  { id: 9,  price: 680,  address: '5 Oak Ave, Amherst',         beds: 1, baths: 1, distance: 1.1, verified: true,  available: 'Jul 15', tag: 'Value',       amenities: ['Heat', 'Laundry'] },
]

export default function Browse() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(1500)
  const [beds, setBeds] = useState('Any')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [maxDistance, setMaxDistance] = useState(2)
  const [saved, setSaved] = useState({})
  const [reported, setReported] = useState({})
  const [reportModal, setReportModal] = useState(null)
  const [reportReason, setReportReason] = useState('')

  const filtered = allListings.filter(l =>
    l.address.toLowerCase().includes(search.toLowerCase()) &&
    l.price <= maxPrice &&
    (beds === 'Any' || l.beds === parseInt(beds)) &&
    (!verifiedOnly || l.verified) &&
    l.distance <= maxDistance
  )

  const toggleSave = id => setSaved(s => ({ ...s, [id]: !s[id] }))

  const submitReport = () => {
    if (reportReason) {
      setReported(r => ({ ...r, [reportModal]: true }))
      setReportModal(null)
      setReportReason('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Browse Listings</h1>
            <p className="text-blue-300 mt-1 text-sm">{filtered.length} listings near UMass Amherst</p>
          </div>
          <button
            onClick={() => navigate('/post-listing')}
            className="flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm"
          >
            <FiPlusCircle size={18} /> Post a Listing
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-7">

        {/* ── Sidebar Filters ──────────────────────────────── */}
        <aside className="w-64 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <FiSliders className="text-blue-600" size={17} />
              <span className="font-bold text-gray-900 text-base">Filters</span>
            </div>

            {/* Search */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Address..."
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            {/* Max Price */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Max Price</label>
                <span className="text-blue-600 text-xs font-bold">${maxPrice}/mo</span>
              </div>
              <input
                type="range" min="500" max="1500" step="50" value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$500</span><span>$1,500</span>
              </div>
            </div>

            {/* Distance */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Max Distance</label>
                <span className="text-blue-600 text-xs font-bold">{maxDistance}mi</span>
              </div>
              <input
                type="range" min="0.2" max="2" step="0.1" value={maxDistance}
                onChange={e => setMaxDistance(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.2mi</span><span>2mi</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Bedrooms</label>
              <div className="flex gap-2 flex-wrap">
                {['Any', '1', '2', '3', '4'].map(b => (
                  <button
                    key={b}
                    onClick={() => setBeds(b)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      beds === b
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {b === 'Any' ? 'Any' : `${b}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified only */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-10 h-5 rounded-full transition-colors relative ${verifiedOnly ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${verifiedOnly ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Verified only</span>
            </label>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setSearch(''); setMaxPrice(1500); setBeds('Any'); setVerifiedOnly(false); setMaxDistance(2) }}
            className="w-full text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors py-2"
          >
            Reset all filters
          </button>
        </aside>

        {/* ── Listings Grid ─────────────────────────────────── */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <FiHome size={52} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold text-gray-600">No listings match your filters</p>
              <p className="text-sm mt-1">Try adjusting the price, distance, or bedroom count.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
                >
                  {/* Image area */}
                  <div className="h-44 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                    <FiHome size={44} className="text-blue-300" />
                    <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {l.tag}
                    </span>
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {l.verified && (
                        <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <FiCheckCircle size={10} /> Verified
                        </span>
                      )}
                    </div>
                    {/* Save button */}
                    <button
                      onClick={() => toggleSave(l.id)}
                      className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                        saved[l.id] ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 hover:text-blue-600'
                      }`}
                    >
                      <FiBookmark size={14} fill={saved[l.id] ? 'white' : 'none'} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="text-2xl font-extrabold text-blue-700 mb-1">
                      ${l.price}<span className="text-sm font-medium text-gray-400">/mo</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                      <FiMapPin size={13} className="text-blue-400 shrink-0" /> {l.address}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[`${l.beds} bed`, `${l.baths} bath`, `${l.distance}mi`, `Avail. ${l.available}`].map(tag => (
                        <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {l.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {l.amenities.map(a => (
                          <span key={a} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{a}</span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                        View Details
                      </button>
                      {reported[l.id] ? (
                        <span className="flex items-center gap-1 text-xs text-gray-400 px-3">
                          <FiCheckCircle size={13} /> Reported
                        </span>
                      ) : (
                        <button
                          onClick={() => setReportModal(l.id)}
                          className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Report listing"
                        >
                          <FiFlag size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Report Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {reportModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setReportModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FiFlag className="text-red-500" /> Report Listing
                </h3>
                <button onClick={() => setReportModal(null)} className="text-gray-400 hover:text-gray-600">
                  <FiX size={20} />
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-4">Why are you reporting this listing?</p>
              <div className="space-y-2 mb-5">
                {['Inaccurate information', 'Scam / fraudulent listing', 'Inappropriate content', 'Already rented / unavailable', 'Other'].map(reason => (
                  <label key={reason} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <input
                      type="radio" name="reason" value={reason}
                      checked={reportReason === reason}
                      onChange={() => setReportReason(reason)}
                      className="accent-blue-600"
                    />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setReportModal(null)}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReport}
                  disabled={!reportReason}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
