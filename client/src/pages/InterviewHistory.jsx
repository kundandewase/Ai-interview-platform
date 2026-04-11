import { useEffect, useState } from "react"
import API from "../services/api"
import { getStoredUser } from "../utils/auth"

function InterviewHistory() {

  const [data, setData] = useState([])

  const user = getStoredUser()

  useEffect(() => {

    const fetch = async () => {
      if (!user?._id) {
        setData([])
        return
      }

      const res = await API.get(
        `/interview/${user._id}`
      )

      setData(res.data)

    }

    fetch()

  }, [user?._id])


  return (
    <div className="app-shell">
      <div className="app-container">
        <h1 className="mb-4 text-2xl font-bold text-cyan-200">Interview History</h1>

        {data.length === 0 && (
          <div className="glass-card p-5 text-slate-300">No interview attempts yet. Complete a round to see results here.</div>
        )}

        <div className="space-y-3">
          {data.map((i) => (
            <div key={i._id} className="glass-card flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="font-semibold text-slate-100">Score: {i.score}/{i.total}</p>
              <p className={i.result === "PASS" ? "text-emerald-300" : "text-rose-300"}>Result: {i.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  )

}

export default InterviewHistory