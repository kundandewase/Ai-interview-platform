import { useState, useEffect } from "react"
import API from "../services/api"
import { getStoredUser } from "../utils/auth"

function InterviewMode() {

  const TOTAL_ROUNDS = 3

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")

  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)

  const [time, setTime] = useState(300)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const [finished, setFinished] = useState(false)
  const [loadingQuestion, setLoadingQuestion] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


  const user = getStoredUser()


  // TIMER

  useEffect(() => {

    if (!isTimerRunning || time <= 0 || finished) return

    const timer = setInterval(() => {

      setTime((t) => t - 1)

    }, 1000)

    return () => clearInterval(timer)

  }, [time, finished, isTimerRunning])


  const formatTime = () => {

    const min = Math.floor(time / 60)
    const sec = time % 60

    return `${min}:${sec < 10 ? "0" : ""}${sec}`

  }


  // GET QUESTION

  const getQuestion = async () => {

    setLoadingQuestion(true)
    setErrorMessage("")

    try {

      const res = await API.post("/ai/ask", {
        message: "Ask me a DSA interview question"
      })

      setQuestion(res.data.reply)

      setAnswer("")
      setFeedback("")
      setTime(300)
      setIsTimerRunning(true)

    } catch (error) {

      setErrorMessage(error?.response?.data?.error || "Failed to load interview question")

    } finally {

      setLoadingQuestion(false)

    }

  }


  // SUBMIT

  const submitAnswer = async () => {

    if (!question) {
      setErrorMessage("Get a question before submitting")
      return
    }

    if (!answer.trim()) {
      setErrorMessage("Please type your answer")
      return
    }

    setLoadingFeedback(true)
    setErrorMessage("")

    try {

      const res = await API.post("/ai/ask", {

        message: `
        Question: ${question}
        Answer: ${answer}
        Check answer and say correct or wrong.
        `

      })

      const reply = res.data.reply

      setFeedback(reply)

      if (reply.toLowerCase().includes("correct")) {
        setScore((s) => s + 1)
      }

    } catch (error) {

      setErrorMessage(error?.response?.data?.error || "Failed to evaluate your answer")

    } finally {

      setLoadingFeedback(false)

    }

  }


  // NEXT ROUND

  const nextRound = () => {

    if (round >= TOTAL_ROUNDS) {

      finishInterview()

    } else {

      setRound(round + 1)
      getQuestion()

    }

  }


  // SAVE RESULT

  const finishInterview = async () => {

    setFinished(true)
    setIsTimerRunning(false)

    try {

      await API.post("/interview/save", {

        userId: user?._id,
        score: score,
        total: TOTAL_ROUNDS

      })

    } catch (err) {

      console.log(err)

    }

  }


  // FINAL SCREEN

  if (finished) {

    return (
      <div className="app-shell">
        <div className="app-container">
          <div className="glass-card mx-auto max-w-xl p-6 text-center">
            <h1 className="text-3xl font-bold text-cyan-200">Interview Finished</h1>
            <h2 className="mt-3 text-xl text-slate-100">Score: {score} / {TOTAL_ROUNDS}</h2>
            <h2 className={`mt-2 text-lg font-semibold ${score >= 2 ? "text-emerald-300" : "text-rose-300"}`}>
              {score >= 2 ? "PASS" : "FAIL"}
            </h2>
          </div>
        </div>
      </div>

    )

  }


  return (

    <div className="app-shell">
      <div className="app-container">
        <div className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-cyan-200">AI Interview Mode</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-md bg-cyan-400/15 px-3 py-1 text-cyan-200">Round {round} / {TOTAL_ROUNDS}</span>
              <span className="rounded-md border border-slate-300 bg-white px-3 py-1 font-semibold text-black">Timer: {formatTime()}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={getQuestion}
              disabled={loadingQuestion}
              className="btn-primary"
            >
              {loadingQuestion ? "Loading..." : "Start Interview"}
            </button>

            <button
              onClick={nextRound}
              className="btn-secondary"
            >
              Next Round
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-700">Question</h3>
            <p className="whitespace-pre-wrap text-slate-700">{question || "Click Get Question to start the round."}</p>
          </div>

          <textarea
            className="field-input mt-4 min-h-36"
            rows={5}
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            placeholder="Write your answer here..."
          />

          <button
            onClick={submitAnswer}
            disabled={loadingFeedback}
            className="btn-primary mt-3"
          >
            {loadingFeedback ? "Checking..." : "Submit Answer"}
          </button>

          {errorMessage && (
            <p className="mt-3 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{errorMessage}</p>
          )}

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-700">Feedback</h3>
            <pre className="whitespace-pre-wrap text-sm text-slate-700">{feedback || "Feedback will appear after submission."}</pre>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-100">Current Score: {score}</h3>
        </div>
      </div>
    </div>

  )

}

export default InterviewMode