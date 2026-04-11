import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import Problems from "./pages/Problems"
import ProblemDetail from "./pages/ProblemDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AIInterview from "./pages/AIInterview"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import InterviewMode from "./pages/InterviewMode"
import InterviewHistory from "./pages/InterviewHistory"
import Leaderboard from "./pages/Leaderboard"
import { getStoredUser } from "./utils/auth"

function AppRoutes() {
  const location = useLocation()
  const user = getStoredUser()
  const hideNavbarRoutes = ["/", "/login", "/signup"]
  const showNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/home" : "/signup"} replace />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <Signup />} />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AIInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewMode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <InterviewHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <Problems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? "/home" : "/signup"} replace />} />

      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App