import { Link, useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const user = localStorage.getItem("user")

  const logout = () => {

    localStorage.removeItem("user")
    navigate("/login")

  }

  return (

    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between">

      <div className="flex gap-4">

        <Link to="/">Home</Link>

        {user && <Link to="/problems">Problems</Link>}

        {user && <Link to="/interview">Interview</Link>}

        {user && <Link to="/leaderboard">Leaderboard</Link>}

        {user && <Link to="/history">History</Link>}

      </div>


      <div className="flex gap-4">

        {!user && <Link to="/login">Login</Link>}

        {!user && <Link to="/signup">Signup</Link>}

        {user && (

          <button
            onClick={logout}
            className="bg-red-500 px-2 rounded"
          >
            Logout
          </button>

        )}

      </div>

    </div>

  )

}

export default Navbar