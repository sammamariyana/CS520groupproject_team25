import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Browse from './pages/Browse'
import PostListing from './pages/PostListing'
import Roommates from './pages/Roommates'
import AIMatch from './pages/AIMatch'
import LeaseReview from './pages/LeaseReview'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/browse"       element={<Browse />} />
        <Route path="/roommates"    element={<Roommates />} />

        {/* Protected — must be logged in */}
        <Route path="/post-listing" element={<ProtectedRoute><PostListing /></ProtectedRoute>} />
        <Route path="/ai-match"     element={<ProtectedRoute><AIMatch /></ProtectedRoute>} />
        <Route path="/lease-review" element={<ProtectedRoute><LeaseReview /></ProtectedRoute>} />
        <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
