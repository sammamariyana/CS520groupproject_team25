import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Browse from './pages/Browse'
import PostListing from './pages/PostListing'
import Roommates from './pages/Roommates'
import AIMatch from './pages/AIMatch'
import LeaseReview from './pages/LeaseReview'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/browse"       element={<Browse />} />
        <Route path="/post-listing" element={<PostListing />} />
        <Route path="/roommates"    element={<Roommates />} />
        <Route path="/ai-match"     element={<AIMatch />} />
        <Route path="/lease-review" element={<LeaseReview />} />
        <Route path="/dashboard"    element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
