import { useEffect, useState } from "react"
import API from "../services/api"

function Leaderboard() {

  const [data, setData] = useState([])

  useEffect(() => {

    const fetch = async () => {

      const res = await API.get("/interview")

      setData(res.data)

    }

    fetch()

  }, [])


  return (
    <div className="app-shell">
      <div className="app-container">
        <h1 className="mb-4 text-2xl font-bold text-cyan-200">Leaderboard</h1>

        {data.length === 0 && (
          <div className="glass-card p-5 text-slate-300">No scores available yet.</div>
        )}

        <div className="space-y-3">
          {data.map((i, index) => (
            <div key={i._id} className="glass-card flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="font-semibold text-cyan-200">Rank #{index + 1}</p>
              <p className="text-slate-100">Score {i.score}/{i.total}</p>
              <p className={i.result === "PASS" ? "text-emerald-300" : "text-rose-300"}>{i.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  )

}

export default Leaderboard