import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('cn_token')
    if (!token) { setLoading(false); return }

    api.get('/api/auth/me')
      .then(setUser)
      .catch(() => localStorage.removeItem('cn_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('cn_token', data.token)
    setUser(data.user)
    return data.user
  }

  async function register(name, email, password) {
    const data = await api.post('/api/auth/register', { name, email, password })
    localStorage.setItem('cn_token', data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('cn_token')
    setUser(null)
  }

  function updateUser(updated) {
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
