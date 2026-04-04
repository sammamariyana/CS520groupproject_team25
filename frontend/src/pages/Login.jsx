import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1F3864 0%, #2E5B9A 100%)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar */}
      <nav style={{ padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <FiHome color="white" size={22} />
          <span style={{ color: 'white', fontSize: '22px', fontWeight: '700' }}>CampusNest</span>
        </div>
      </nav>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ background: 'white', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          
          {/* Toggle */}
          <div style={{ display: 'flex', background: '#f0f4ff', borderRadius: '12px', padding: '4px', marginBottom: '32px' }}>
            {['Log In', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => setIsLogin(i === 0)}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s',
                  background: isLogin === (i === 0) ? '#1F3864' : 'transparent',
                  color: isLogin === (i === 0) ? 'white' : '#666' }}>
                {tab}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1F3864', margin: '0 0 8px' }}>
            {isLogin ? 'Welcome back! 👋' : 'Join CampusNest 🏠'}
          </h2>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 28px' }}>
            {isLogin ? 'Log in to your account' : 'Use your UMass or Five College email'}
          </p>

          {/* Fields */}
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Sammam Ariyana"
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#333' }} />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>University Email</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} color="#888" size={16} />
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="sammam@umass.edu"
                style={{ width: '100%', padding: '12px 16px 12px 42px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#333' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} color="#888" size={16} />
              <input name="password" value={form.password} onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 42px 12px 42px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#333' }} />
              <div onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                {showPassword ? <FiEyeOff color="#888" size={16} /> : <FiEye color="#888" size={16} />}
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/')}
            style={{ width: '100%', padding: '14px', background: '#1F3864', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
            {isLogin ? 'Log In' : 'Create Account'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#4472C4', fontWeight: '600', cursor: 'pointer' }}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </span>
          </div>

        </motion.div>
      </div>
    </div>
  )
}