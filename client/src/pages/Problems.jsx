import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

const SCORE_STORAGE_KEY = "problemScoreState"

function Problems() {

  const [problems, setProblems] = useState([])
  const [filter, setFilter] = useState("All")
  const [score, setScore] = useState(0)

  useEffect(() => {
    const raw = localStorage.getItem(SCORE_STORAGE_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      const solvedIds = Array.isArray(parsed?.solvedIds) ? parsed.solvedIds : []
      setScore(solvedIds.length)
    } catch {
      localStorage.removeItem(SCORE_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {

    const fetchProblems = async () => {

      const res = await API.get("/problems")
      setProblems(res.data)

    }

    fetchProblems()

  }, [])


  const filteredProblems = problems.filter((p) => {

    if (filter === "All") return true
    return p.difficulty === filter

  })


  return (
    <div className="app-shell">
      <div className="app-container">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-cyan-200">Problems</h1>
          <span className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
            Solved Score: {score}
          </span>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { label: "All", tone: "text-slate-200" },
            { label: "Easy", tone: "text-emerald-300" },
            { label: "Medium", tone: "text-amber-300" },
            { label: "Hard", tone: "text-rose-300" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setFilter(item.label)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                filter === item.label
                  ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-200"
                  : "border-slate-700 bg-slate-900/70"
              } ${item.tone}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProblems.map((p) => (
            <Link to={`/problems/${p._id}`} key={p._id} className="glass-card p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40">
              <h2 className="text-lg font-semibold text-slate-100">{p.title}</h2>
              <p
                className={`mt-1 text-sm font-medium ${
                  p.difficulty === "Easy"
                    ? "text-emerald-300"
                    : p.difficulty === "Medium"
                      ? "text-amber-300"
                      : "text-rose-300"
                }`}
              >
                {p.difficulty}
              </p>
            </Link>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="glass-card mt-4 p-4 text-slate-300">No problems found for this filter.</div>
        )}
      </div>
    </div>

  )

}

export default Problems