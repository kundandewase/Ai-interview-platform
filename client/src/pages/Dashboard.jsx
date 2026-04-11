import { useEffect, useMemo, useState } from "react"
import API from "../services/api"
import { getStoredUser } from "../utils/auth"
import { Link } from "react-router-dom"

const SCORE_STORAGE_KEY = "problemScoreState"

function Dashboard() {

  const user = getStoredUser()
  const [solvedCount, setSolvedCount] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [interviewHistory, setInterviewHistory] = useState([])
  const [targetProblems, setTargetProblems] = useState(20)
  const [targetRounds, setTargetRounds] = useState(10)

  useEffect(() => {
    const raw = localStorage.getItem(SCORE_STORAGE_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      const solvedIds = Array.isArray(parsed?.solvedIds) ? parsed.solvedIds : []
      setSolvedCount(solvedIds.length)
    } catch {
      localStorage.removeItem(SCORE_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const problemsRes = await API.get("/problems")
        const list = Array.isArray(problemsRes.data) ? problemsRes.data : []
        setTotalProblems(list.length)
      } catch {
        setTotalProblems(0)
      }

      if (!user?._id) {
        setInterviewHistory([])
        return
      }

      try {
        const interviewRes = await API.get(`/interview/${user._id}`)
        setInterviewHistory(Array.isArray(interviewRes.data) ? interviewRes.data : [])
      } catch {
        setInterviewHistory([])
      }
    }

    fetchStats()
  }, [user?._id])

  const progress = useMemo(() => {
    const attempts = interviewHistory.length
    const passCount = interviewHistory.filter((item) => item.result === "PASS").length
    const passRate = attempts ? Math.round((passCount / attempts) * 100) : 0

    const avgInterviewScore = attempts
      ? Math.round(
          interviewHistory.reduce((sum, item) => {
            if (!item.total) return sum
            return sum + (item.score / item.total) * 100
          }, 0) / attempts
        )
      : 0

    const problemCoverage = totalProblems ? Math.round((solvedCount / totalProblems) * 100) : 0

    const problemGoalProgress = targetProblems
      ? Math.min(100, Math.round((solvedCount / targetProblems) * 100))
      : 0

    const interviewGoalProgress = targetRounds
      ? Math.min(100, Math.round((attempts / targetRounds) * 100))
      : 0

    const readiness = Math.round(
      problemCoverage * 0.4 + avgInterviewScore * 0.4 + passRate * 0.2
    )

    return {
      attempts,
      passRate,
      avgInterviewScore,
      problemCoverage,
      problemGoalProgress,
      interviewGoalProgress,
      readiness,
    }
  }, [interviewHistory, solvedCount, targetProblems, targetRounds, totalProblems])

  const bars = [
    { label: "Problem Coverage", value: progress.problemCoverage },
    { label: "Interview Average", value: progress.avgInterviewScore },
    { label: "Pass Rate", value: progress.passRate },
    { label: "Overall Readiness", value: progress.readiness },
  ]

  return (
    <div className="app-shell">
      <div className="app-container space-y-6">
        <section className="glass-card p-6">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.username || "Candidate"}</h1>
          <p className="mt-2 text-slate-600">Practice coding challenges and AI interviews from one place.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Solved</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{solvedCount}</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Problems</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalProblems || "-"}</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interview Rounds</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{progress.attempts}</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Readiness Score</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{progress.readiness}%</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-5">
            <h2 className="text-lg font-semibold text-slate-900">Progress Calculator</h2>
            <p className="mt-1 text-sm text-slate-600">Set your targets and track completion in real time.</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-700">
                Target Problems
                <input
                  type="number"
                  min={1}
                  className="field-input mt-1"
                  value={targetProblems}
                  onChange={(e) => setTargetProblems(Number(e.target.value) || 1)}
                />
              </label>

              <label className="text-sm text-slate-700">
                Target Interview Rounds
                <input
                  type="number"
                  min={1}
                  className="field-input mt-1"
                  value={targetRounds}
                  onChange={(e) => setTargetRounds(Number(e.target.value) || 1)}
                />
              </label>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm text-slate-700">
                  <span>Problem Goal Progress</span>
                  <span>{progress.problemGoalProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progress.problemGoalProgress}%` }} />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm text-slate-700">
                  <span>Interview Goal Progress</span>
                  <span>{progress.interviewGoalProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progress.interviewGoalProgress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="text-lg font-semibold text-slate-900">Performance Breakdown</h2>
            <p className="mt-1 text-sm text-slate-600">Calculated from solved problems and interview outcomes.</p>

            <div className="mt-4 space-y-3">
              {bars.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm text-slate-700">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Pass rate: <span className="font-semibold text-slate-900">{progress.passRate}%</span>
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link to="/problems" className="glass-card p-5 transition hover:-translate-y-0.5 hover:border-slate-400">
            <h2 className="text-lg font-semibold text-slate-900">Problems</h2>
            <p className="mt-1 text-sm text-slate-600">Solve by difficulty and run code live.</p>
          </Link>

          <Link to="/interview" className="glass-card p-5 transition hover:-translate-y-0.5 hover:border-slate-400">
            <h2 className="text-lg font-semibold text-slate-900">Interview Mode</h2>
            <p className="mt-1 text-sm text-slate-600">Timed mock rounds with AI-generated questions.</p>
          </Link>

          <Link to="/history" className="glass-card p-5 transition hover:-translate-y-0.5 hover:border-slate-400">
            <h2 className="text-lg font-semibold text-slate-900">History</h2>
            <p className="mt-1 text-sm text-slate-600">Review your previous scores and results.</p>
          </Link>
        </section>
      </div>
    </div>

  )

}

export default Dashboard