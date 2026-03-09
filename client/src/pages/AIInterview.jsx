import { useState } from "react"
import API from "../services/api"

function AIInterview() {

  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("")

  const askAI = async () => {

    const res = await API.post("/ai/ask", {
      message: msg
    })

    setReply(res.data.reply)

  }

  return (

    <div className="p-5 text-white bg-gray-900 min-h-screen">

      <h2>AI Interview</h2>

      <textarea
        className="text-black w-full"
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-green-500 px-3"
      >
        Ask AI
      </button>

      <pre>{reply}</pre>

    </div>

  )

}

export default AIInterview