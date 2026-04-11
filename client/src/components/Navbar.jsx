import { NavLink, useNavigate } from "react-router-dom"
import { getStoredUser } from "../utils/auth"

function Navbar() {

  const navigate = useNavigate()

  const user = getStoredUser()

  const logout = () => {

    localStorage.removeItem("user")
    navigate("/login")

  }

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`

  return (

    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="text-sm font-extrabold uppercase tracking-[0.2em] text-slate-900">
          AI Interview
        </div>

        <nav className="flex flex-wrap items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/problems" className={navLinkClass}>
                Problems
              </NavLink>
              <NavLink to="/ai" className={navLinkClass}>
                AI Coach
              </NavLink>
              <NavLink to="/interview" className={navLinkClass}>
                Interview
              </NavLink>
              <NavLink to="/leaderboard" className={navLinkClass}>
                Leaderboard
              </NavLink>
              <NavLink to="/history" className={navLinkClass}>
                History
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!user && (
            <NavLink to="/login" className="btn-secondary premium-shimmer text-sm">
              Login
            </NavLink>
          )}

          {!user && (
            <NavLink to="/signup" className="btn-primary text-sm">
              Signup
            </NavLink>
          )}

          {user && (
            <button onClick={logout} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>

  )

}

export default Navbar