import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isLogin, setIsLogin]         = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm]               = useState({ name: '', email: '', password: '' })
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, register } = useAuth()

  const redirect = searchParams.get('redirect') || '/dashboard'

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const isEduEmail   = form.email.endsWith('.edu') || form.email === ''
  const emailWarning = !isLogin && form.email && !isEduEmail

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('Please fill in all fields.')
      return
    }
    if (!isLogin && !isEduEmail) {
      setError('Please use your university (.edu) email address.')
      return
    }
    setLoading(true)
    try {
      if (isLogin) {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col">

      {/* Minimal nav */}
      <nav className="px-8 h-16 flex items-center">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
          <div className="bg-blue-500 rounded-lg p-1.5 group-hover:bg-blue-400 transition-colors">
            <FiHome className="text-white" size={18} />
          </div>
          <span className="text-white text-xl font-bold">
            Campus<span className="text-blue-300">Nest</span>
          </span>
        </button>
      </nav>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        >
          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {['Log In', 'Sign Up'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setIsLogin(i === 0); setError('') }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isLogin === (i === 0)
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                {isLogin ? 'Welcome back!' : 'Join CampusNest'}
              </h2>
              <p className="text-gray-500 text-sm mb-7">
                {isLogin ? 'Log in to access your dashboard.' : 'Use your university .edu email to register.'}
              </p>

              <div className="space-y-4">
                {/* Name (signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="Alex Johnson"
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    University Email
                    {!isLogin && <span className="ml-2 text-xs font-normal text-gray-400">(.edu required)</span>}
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      name="email" value={form.email} onChange={handleChange}
                      placeholder="you@umass.edu"
                      className={`w-full border rounded-xl pl-10 pr-10 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                        emailWarning ? 'border-amber-400 focus:ring-amber-400' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                    />
                    {form.email && !emailWarning && <FiCheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" size={16} />}
                    {emailWarning && <FiAlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-500" size={16} />}
                  </div>
                  {emailWarning && (
                    <p className="text-amber-600 text-xs mt-1.5 flex items-center gap-1">
                      <FiAlertCircle size={12} /> Must be a .edu address (e.g. you@umass.edu)
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      name="password" value={form.password} onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Social media connect (signup only) */}
                {!isLogin && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 mb-3">
                      Connect social accounts for trust badges <span className="text-gray-400 font-normal">(optional)</span>
                    </p>
                    <div className="flex gap-2">
                      {[
                        { label: 'Facebook',  bg: 'bg-blue-600 hover:bg-blue-700',                                              text: 'text-white' },
                        { label: 'Instagram', bg: 'bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500', text: 'text-white' },
                        { label: 'Snapchat',  bg: 'bg-yellow-400 hover:bg-yellow-300',                                          text: 'text-gray-900' },
                      ].map(s => (
                        <button key={s.label} type="button"
                          className={`flex-1 ${s.bg} ${s.text} text-xs font-bold py-2 rounded-lg transition-all`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <FiAlertCircle size={15} /> {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (isLogin ? 'Log In' : 'Create Account')}
              </button>

              {isLogin && (
                <button className="w-full mt-3 text-sm text-blue-600 hover:underline font-medium">
                  Forgot your password?
                </button>
              )}

              <p className="text-center text-sm text-gray-500 mt-5">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setIsLogin(!isLogin); setError('') }}
                  className="text-blue-600 font-semibold hover:underline">
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
