import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (event) => {

    event.preventDefault()
    setErrorMessage("")

    if (!email || !password) {
      setErrorMessage("Please enter email and password")
      return
    }

    setLoading(true)

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("user", JSON.stringify(res.data))

      navigate("/home")

    } catch (error) {

      setErrorMessage(error?.response?.data?.message || "Login failed. Please try again.")

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="app-shell">
      <div className="app-container flex min-h-[calc(100vh-90px)] items-center justify-center">
        <div className="glass-card w-full max-w-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-200">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-300">Log in to continue your interview practice journey.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
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

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-300">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>

  )

}

export default Login