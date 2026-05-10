import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Browse',       path: '/browse' },
  { label: 'Roommates',    path: '/roommates' },
  { label: 'AI Match',     path: '/ai-match' },
  { label: 'Lease Review', path: '/lease-review' },
  { label: 'Post Listing', path: '/post-listing' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const initials = user
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : ''

  function handleLogout() {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-blue-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <button onClick={() => navigate('/')} className="flex items-center gap-2 group shrink-0">
          <div className="bg-blue-500 rounded-lg p-1.5 group-hover:bg-blue-400 transition-colors">
            <FiHome className="text-white" size={18} />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            Campus<span className="text-blue-300">Nest</span>
          </span>
        </button>

        <div className="flex items-center gap-0.5">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                pathname === link.path
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 transition-colors rounded-xl px-3 py-2"
              >
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <span className="text-white text-sm font-medium max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <FiChevronDown className="text-blue-300" size={14} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <button
                    onClick={() => { navigate('/dashboard'); setDropdownOpen(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiUser size={15} className="text-blue-600" /> Dashboard
                  </button>
                  <div className="border-t border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-800"
              >
                <FiUser size={15} /> Dashboard
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-blue-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors"
              >
                Sign In
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
