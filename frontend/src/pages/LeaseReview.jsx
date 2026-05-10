import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiUpload, FiShield, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import Navbar from '../components/Navbar'

const mockSummary = {
  overview: 'This is a 12-month fixed-term lease for a 2-bedroom apartment at 123 N Pleasant St, Amherst MA, starting August 1, 2026. Monthly rent is $950 with a $1,900 security deposit required. The lease auto-renews as month-to-month unless either party gives 60 days notice.',
  terms: [
    { label: 'Lease Term',         value: '12 months (Aug 1, 2026 – Jul 31, 2027)' },
    { label: 'Monthly Rent',       value: '$950/month, due on the 1st' },
    { label: 'Security Deposit',   value: '$1,900 (2 months rent)' },
    { label: 'Late Fee',           value: '$75 after 5-day grace period' },
    { label: 'Utilities',          value: 'Tenant responsible for all (electric, gas, internet)' },
    { label: 'Pets',               value: 'No pets allowed' },
    { label: 'Subletting',         value: 'Not permitted without written consent' },
    { label: 'Notice to Vacate',   value: '60 days written notice required' },
  ],
  redFlags: [
    { severity: 'high',   title: 'Auto-renew clause',           desc: 'Lease auto-renews without requiring your signature. You must give 60 days written notice to avoid being locked into another term.' },
    { severity: 'high',   title: 'Landlord entry notice',       desc: 'Section 12 states landlord may enter with only 12 hours notice. Massachusetts law requires 24 hours except in emergencies.' },
    { severity: 'medium', title: 'Cleaning fee clause',         desc: 'A mandatory non-refundable $200 cleaning fee is charged regardless of property condition at move-out.' },
    { severity: 'medium', title: 'Snow removal responsibility', desc: 'Tenant is responsible for snow removal from driveway and walkways. This is unusually broad — verify local ordinances.' },
    { severity: 'low',    title: 'Pest control',                desc: 'Tenant is responsible for pest control costs after the first 30 days. Clarify this with your landlord before signing.' },
  ],
  recommendations: [
    'Request that the auto-renew clause be changed to require affirmative renewal.',
    'Ask the landlord to correct the entry notice to 24 hours per MA law.',
    'Negotiate removal of the non-refundable cleaning fee or make it conditional on damage.',
    'Document the property condition thoroughly with photos on move-in day.',
    'Clarify in writing who is responsible for snow removal.',
  ],
}

const severityConfig = {
  high:   { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'text-red-500',    badge: 'bg-red-100 text-red-700',    label: 'High Risk' },
  medium: { bg: 'bg-amber-50',  border: 'border-amber-200',  icon: 'text-amber-500',  badge: 'bg-amber-100 text-amber-700', label: 'Review' },
  low:    { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'text-blue-500',   badge: 'bg-blue-100 text-blue-700',   label: 'Note' },
}

export default function LeaseReview() {
  const [file, setFile]             = useState(null)
  const [isDragging, setDragging]   = useState(false)
  const [isAnalyzing, setAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab]   = useState('summary')
  const fileRef = useRef()

  const handleFile = f => {
    if (f && f.type === 'application/pdf') setFile(f)
  }

  const handleDrop = e => {
    e.preventDefault(); setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setShowResults(true) }, 2500)
  }

  const highCount   = mockSummary.redFlags.filter(r => r.severity === 'high').length
  const mediumCount = mockSummary.redFlags.filter(r => r.severity === 'medium').length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-900 to-blue-900 py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-cyan-700/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiFileText className="text-white" size={28} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">AI Lease Review</h1>
          <p className="text-cyan-300 text-lg">Upload your lease PDF — get a plain-English summary and red flag analysis</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <FiShield className="text-cyan-400" size={14} />
            <span className="text-cyan-400 text-sm">Your document is anonymized before analysis — no personal information is sent to the AI</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* ── Results ──────────────────────────────────────── */}
        {showResults ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Score summary bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FiCheckCircle size={20} />
                  <span className="font-bold text-base">Analysis Complete</span>
                </div>
                <div className="flex gap-3 ml-auto">
                  <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                    {highCount} High Risk
                  </span>
                  <span className="bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1 rounded-full">
                    {mediumCount} Review
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                    {mockSummary.redFlags.filter(r => r.severity === 'low').length} Notes
                  </span>
                </div>
                <button onClick={() => { setShowResults(false); setFile(null) }}
                  className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {[['summary', 'Summary'], ['terms', 'Key Terms'], ['flags', `Red Flags (${mockSummary.redFlags.length})`], ['tips', 'Recommendations']].map(([k, l]) => (
                <button key={k} onClick={() => setActiveTab(k)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === k ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}>{l}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                {/* Summary tab */}
                {activeTab === 'summary' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                      <FiFileText className="text-cyan-600" size={18} /> Lease Overview
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{mockSummary.overview}</p>
                  </div>
                )}

                {/* Key Terms tab */}
                {activeTab === 'terms' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                    {mockSummary.terms.map(t => (
                      <div key={t.label} className="flex items-start gap-4 p-4">
                        <span className="text-sm font-semibold text-gray-500 w-40 shrink-0">{t.label}</span>
                        <span className="text-sm text-gray-800 font-medium">{t.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Red Flags tab */}
                {activeTab === 'flags' && (
                  <div className="space-y-4">
                    {mockSummary.redFlags.map(flag => {
                      const cfg = severityConfig[flag.severity]
                      return (
                        <div key={flag.title} className={`${cfg.bg} ${cfg.border} border rounded-2xl p-5`}>
                          <div className="flex items-start gap-3">
                            <FiAlertTriangle className={`${cfg.icon} mt-0.5 shrink-0`} size={18} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-sm">{flag.title}</span>
                                <span className={`${cfg.badge} text-xs font-bold px-2 py-0.5 rounded-full`}>{cfg.label}</span>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">{flag.desc}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Recommendations tab */}
                {activeTab === 'tips' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                      <FiInfo className="text-blue-600" size={18} /> Before You Sign
                    </h3>
                    <ul className="space-y-3">
                      {mockSummary.recommendations.map((r, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : isAnalyzing ? (
          /* ── Analyzing ── */
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your lease...</h3>
            <p className="text-gray-500 text-sm">Anonymizing personal information and reviewing all clauses.</p>
          </div>
        ) : (
          /* ── Upload form ── */
          <>
            {/* Privacy notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <FiShield className="text-emerald-600 mt-0.5 shrink-0" size={18} />
              <div>
                <p className="text-emerald-800 font-semibold text-sm">Your privacy is protected</p>
                <p className="text-emerald-700 text-sm mt-0.5">Names, addresses, and signatures are automatically stripped from your document before any AI analysis. Your original file never leaves this app.</p>
              </div>
            </div>

            {/* Upload area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                isDragging ? 'border-cyan-500 bg-cyan-50' :
                file ? 'border-emerald-400 bg-emerald-50' :
                'border-gray-200 bg-white hover:border-cyan-400 hover:bg-cyan-50'
              }`}
            >
              <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
              {file ? (
                <>
                  <FiCheckCircle size={40} className="text-emerald-500 mx-auto mb-4" />
                  <p className="font-bold text-emerald-700 text-lg">{file.name}</p>
                  <p className="text-emerald-600 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB · PDF</p>
                  <p className="text-gray-400 text-xs mt-3">Click to replace</p>
                </>
              ) : (
                <>
                  <FiUpload size={40} className="text-gray-300 mx-auto mb-4" />
                  <p className="font-bold text-gray-700 text-lg">Drop your lease PDF here</p>
                  <p className="text-gray-400 text-sm mt-1">or click to browse files</p>
                  <p className="text-gray-300 text-xs mt-3">PDF only · Max 20MB</p>
                </>
              )}
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={!file}
              className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 shadow-md shadow-cyan-200"
            >
              <FiFileText size={18} />
              {file ? 'Analyze My Lease' : 'Upload a PDF to get started'}
            </button>

            {/* What we check */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-base">What we check</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Rent & payment terms', 'Lease duration & renewal'],
                  ['Security deposit rules', 'Utilities & maintenance'],
                  ['Entry notice requirements', 'Subletting & guest policies'],
                  ['Pet & smoking clauses', 'Early termination penalties'],
                ].map(([a, b]) => (
                  <div key={a} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheckCircle className="text-cyan-500 shrink-0" size={14} /> {a}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheckCircle className="text-cyan-500 shrink-0" size={14} /> {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
