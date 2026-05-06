import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiUser } from 'react-icons/fi'

const navLinks = [
  { label: 'Browse', path: '/browse' },
  { label: 'Roommates', path: '/roommates' },
  { label: 'AI Match', path: '/ai-match' },
  { label: 'Lease Review', path: '/lease-review' },
  { label: 'Post Listing', path: '/post-listing' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bg-blue-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group shrink-0"
        >
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
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-800"
          >
            <FiUser size={15} />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors"
          >
            Sign In
          </button>
        </div>

      </div>
    </nav>
  )
}
