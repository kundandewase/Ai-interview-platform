import { useState } from "react"
import API from "../services/api"

function AIInterview() {

  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const askAI = async () => {

    if (!msg.trim()) {
      setErrorMessage("Please enter your question")
      return
    }

    setLoading(true)
    setErrorMessage("")

    try {

      const res = await API.post("/ai/ask", {
        message: msg
      })

      setReply(res.data.reply)

    } catch (error) {

      setReply("")
      setErrorMessage(error?.response?.data?.error || "Failed to get AI response")

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold text-slate-900">AI Coach</h2>
          <p className="mt-2 text-sm text-slate-600">Ask interview questions, design prompts, or debugging scenarios.</p>

          <textarea
            className="field-input mt-4 min-h-40"
            value={msg}
            placeholder="Example: Explain time complexity of merge sort with trade-offs."
            onChange={(e)=>setMsg(e.target.value)}
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="btn-primary mt-3"
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>

          {errorMessage && (
            <p className="mt-3 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{errorMessage}</p>
          )}

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-700">AI Response</h3>
            <pre className="whitespace-pre-wrap text-sm text-slate-700">{reply || "Your AI response will appear here."}</pre>
          </div>
        </div>
      </div>
    </div>

  )

}

export default AIInterview