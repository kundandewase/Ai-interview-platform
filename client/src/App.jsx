import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
<Route path="/interview" element={<InterviewMode />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai" element={<AIInterview />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
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

      </Routes>

    </Router>

  )

}

export default App