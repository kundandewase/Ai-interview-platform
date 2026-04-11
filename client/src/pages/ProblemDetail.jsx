import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"
import Editor from "@monaco-editor/react"
import { getStoredUser } from "../utils/auth"

const SCORE_STORAGE_KEY = "problemScoreState"

function ProblemDetail() {

  const { id } = useParams()
  const navigate = useNavigate()
  const user = getStoredUser()

  const [problem, setProblem] = useState(null)
  const [problems, setProblems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [lastResult, setLastResult] = useState("")
  const [score, setScore] = useState(0)
  const [savingSubmission, setSavingSubmission] = useState(false)

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

    const fetchProblem = async () => {

      const res = await API.get(`/problems/${id}`)
      setProblem(res.data)

    }

    const fetchAllProblems = async () => {
      const res = await API.get("/problems")
      const list = Array.isArray(res.data) ? res.data : []
      setProblems(list)

      const idx = list.findIndex((item) => String(item._id) === String(id))
      setCurrentIndex(idx)
    }

    fetchProblem()
    fetchAllProblems()

  }, [id])


  const markSolved = (problemId) => {
    const raw = localStorage.getItem(SCORE_STORAGE_KEY)
    let solvedIds = []

    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        solvedIds = Array.isArray(parsed?.solvedIds) ? parsed.solvedIds : []
      } catch {
        solvedIds = []
      }
    }

    if (!solvedIds.includes(problemId)) {
      solvedIds.push(problemId)
      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify({ solvedIds }))
      setScore(solvedIds.length)
    }
  }


  const saveSubmission = async (result) => {
    if (!user?._id || !problem?._id) return

    setSavingSubmission(true)

    try {
      await API.post("/submissions", {
        userId: user._id,
        problemId: problem._id,
        code,
        language,
        result,
      })
    } catch {
      // Submission saving should not block UX for run results.
    } finally {
      setSavingSubmission(false)
    }
  }


  const runCode = async () => {

    try {
      const res = await API.post("/code/run", {
        code,
        language
      })

      const { status, stdout, stderr, compile_output } = res.data
      const normalizedStatus = (status || "").toLowerCase()
      const accepted = normalizedStatus.includes("accepted")

      const formattedOutput = [
        `Status: ${status}`,
        stdout ? `Output:\n${stdout}` : "",
        stderr ? `Error:\n${stderr}` : "",
        compile_output ? `Compile Output:\n${compile_output}` : ""
      ]
        .filter(Boolean)
        .join("\n\n")

      setOutput(formattedOutput)
      setLastResult(accepted ? "Accepted" : status || "Failed")

      await saveSubmission(accepted ? "Accepted" : status || "Failed")

      if (accepted && problem?._id) {
        markSolved(problem._id)
      }
    } catch (error) {
      setOutput(error?.response?.data?.message || "Failed to run code")
      setLastResult("Failed")
    }

  }


  const goToNextQuestion = () => {
    if (currentIndex === -1 || currentIndex >= problems.length - 1) {
      navigate("/problems")
      return
    }

    const nextProblem = problems[currentIndex + 1]
    navigate(`/problems/${nextProblem._id}`)
  }


  if (!problem) {
    return (
      <div className="app-shell">
        <div className="app-container">
          <div className="glass-card p-5 text-slate-300">Loading problem...</div>
        </div>
      </div>
    )
  }


  return (

    <div className="app-shell">
      <div className="app-container grid gap-4 lg:grid-cols-2">
        <section className="glass-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-bold text-cyan-200">{problem.title}</h2>
            <span className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
              Score: {score}
            </span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-slate-200">{problem.description}</p>
          <p
            className={`mt-4 font-semibold ${
              problem.difficulty === "Easy"
                ? "text-emerald-300"
                : problem.difficulty === "Medium"
                  ? "text-amber-300"
                  : "text-rose-300"
            }`}
          >
            Difficulty: {problem.difficulty}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button onClick={goToNextQuestion} className="btn-secondary">
              Next Question
            </button>

            {lastResult && (
              <span
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  lastResult === "Accepted"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-rose-400/15 text-rose-300"
                }`}
              >
                Last Result: {lastResult}
              </span>
            )}

            {savingSubmission && (
              <span className="text-sm text-slate-300">Saving submission...</span>
            )}
          </div>

          {currentIndex >= problems.length - 1 && problems.length > 0 && (
            <p className="mt-2 text-sm text-slate-300">This is the last question. Next will return to Problems.</p>
          )}
        </section>

        <section className="glass-card flex min-h-[70vh] flex-col overflow-hidden">
          <div className="border-b border-slate-700 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <select className="field-input w-44" value={language} onChange={(e)=>setLanguage(e.target.value)}>
                <option>javascript</option>
                <option>python</option>
                <option>cpp</option>
              </select>

              <button onClick={runCode} className="btn-primary">Run</button>
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={(v)=>setCode(v || "")}
            />
          </div>

          <div className="h-40 overflow-auto border-t border-slate-700 bg-slate-950/80 p-3">
            <pre className="whitespace-pre-wrap text-xs text-slate-200">{output || "Run your code to see output."}</pre>
          </div>
        </section>
      </div>
    </div>

  )

}

export default ProblemDetail