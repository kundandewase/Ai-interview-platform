import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"

function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSignup = async (event) => {

    event.preventDefault()
    setMessage("")
    setErrorMessage("")

    if (!username || !email || !password) {
      setErrorMessage("Please fill all fields")
      return
    }

    setLoading(true)

    try {

      await API.post("/auth/signup", {
        username,
        email,
        password
      })

      setMessage("Signup successful! Redirecting to login...")

      setTimeout(() => {
        navigate("/login")
      }, 900)

    } catch (error) {

      setErrorMessage(error?.response?.data?.message || "Signup failed. Please try again.")

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="app-shell">
      <div className="app-container flex min-h-[calc(100vh-90px)] items-center justify-center">
        <div className="glass-card w-full max-w-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-cyan-200">Create Account</h1>
          <p className="mt-2 text-sm text-slate-300">Start practicing coding interviews with AI-powered feedback.</p>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="field-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-input"
              />
            </div>

            {errorMessage && (
              <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {errorMessage}
              </p>
            )}

            {message && (
              <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                {message}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Signup