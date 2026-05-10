import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiMapPin, FiDollarSign, FiCalendar, FiCheckCircle, FiUpload, FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'

const amenityOptions = [
  'Parking', 'In-unit Laundry', 'Shared Laundry', 'Central AC', 'Heat Included',
  'WiFi Included', 'Dishwasher', 'Pets Allowed', 'Furnished', 'Utilities Included',
]

const initialForm = {
  title: '', address: '', price: '', available: '',
  beds: '1', baths: '1', sqft: '', pets: 'No',
  description: '', amenities: [], contactName: '', contactEmail: '', contactPhone: '',
}

export default function PostListing() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleAmenity = a => set('amenities', form.amenities.includes(a) ? form.amenities.filter(x => x !== a) : [...form.amenities, a])

  const steps = ['Basic Info', 'Details', 'Description', 'Contact']

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Listing Submitted!</h2>
            <p className="text-gray-500 mb-2">Your listing is under review and will be live within 24 hours.</p>
            <p className="text-gray-400 text-sm mb-10">You'll receive a confirmation at <strong>{form.contactEmail}</strong></p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/browse')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Browse Listings
              </button>
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm); setStep(1) }}
                className="border-2 border-gray-300 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Post Another
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-blue-900 py-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
          <button onClick={() => navigate('/browse')} className="text-blue-300 hover:text-white transition-colors">
            <FiArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Post a Listing</h1>
            <p className="text-blue-300 mt-1 text-sm">Let students know about your available property</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i + 1 < step ? 'bg-emerald-500 text-white cursor-pointer' :
                  i + 1 === step ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1 < step ? <FiCheckCircle size={15} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i + 1 === step ? 'text-blue-700' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 w-8 ${i + 1 < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* ── Step 1: Basic Info ── */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Listing Title</label>
                  <input
                    value={form.title} onChange={e => set('title', e.target.value)}
                    placeholder="e.g. Cozy 2BR near UMass, utilities included"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Street Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      value={form.address} onChange={e => set('address', e.target.value)}
                      placeholder="123 N Pleasant St, Amherst, MA"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Rent</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        value={form.price} onChange={e => set('price', e.target.value)}
                        placeholder="850"
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Available Date</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                      <input
                        type="date" value={form.available} onChange={e => set('available', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Property Details ── */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Property Details</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  {[['Bedrooms', 'beds', ['1','2','3','4','5+']], ['Bathrooms', 'baths', ['1','1.5','2','2.5','3']]].map(([label, key, opts]) => (
                    <div key={key} className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                      <select
                        value={form[key]} onChange={e => set(key, e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sq Ft <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      value={form.sqft} onChange={e => set('sqft', e.target.value)}
                      placeholder="800"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.map(a => (
                      <label key={a} className="flex items-center gap-2.5 cursor-pointer p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                        <div
                          onClick={() => toggleAmenity(a)}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            form.amenities.includes(a) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                          }`}
                        >
                          {form.amenities.includes(a) && <FiCheckCircle size={12} className="text-white" />}
                        </div>
                        <span className="text-sm text-gray-700">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Photo upload placeholder */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Photos</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <FiUpload size={28} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600">Drop photos here or <span className="text-blue-600">browse</span></p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Description ── */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Describe Your Property</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    value={form.description} onChange={e => set('description', e.target.value)}
                    placeholder="Describe the property, neighborhood, lease terms, any house rules..."
                    rows={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">{form.description.length} / 1000 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pets Allowed</label>
                  <div className="flex gap-3">
                    {['No', 'Cats OK', 'Dogs OK', 'All Pets OK'].map(p => (
                      <button key={p} onClick={() => set('pets', p)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          form.pets === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Contact ── */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                {[
                  ['Contact Name', 'contactName', 'text', 'Your name or landlord name'],
                  ['Email Address', 'contactEmail', 'email', 'contact@umass.edu'],
                  ['Phone Number', 'contactPhone', 'tel', '(413) 555-0100'],
                ].map(([label, key, type, ph]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                    <input
                      type={type} value={form[key]} onChange={e => set(key, e.target.value)}
                      placeholder={ph}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>
              {/* Summary */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 mb-2">Listing Summary</p>
                <p className="text-sm text-blue-700">{form.title || 'Untitled listing'}</p>
                <p className="text-xs text-blue-500 mt-1">{form.address} · ${form.price}/mo · {form.beds} bed / {form.baths} bath</p>
              </div>
            </motion.div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                <FiHome size={16} /> Submit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
