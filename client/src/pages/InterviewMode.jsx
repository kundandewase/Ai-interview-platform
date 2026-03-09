import { useState, useEffect } from "react"
import API from "../services/api"

function InterviewMode() {

  const TOTAL_ROUNDS = 3

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")

  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)

  const [time, setTime] = useState(300)

  const [finished, setFinished] = useState(false)


  const user = JSON.parse(
    localStorage.getItem("user")
  )


  // TIMER

  useEffect(() => {

    if (time <= 0 || finished) return

    const timer = setInterval(() => {

      setTime((t) => t - 1)

    }, 1000)

    return () => clearInterval(timer)

  }, [time, finished])


  const formatTime = () => {

    const min = Math.floor(time / 60)
    const sec = time % 60

    return `${min}:${sec < 10 ? "0" : ""}${sec}`

  }


  // GET QUESTION

  const getQuestion = async () => {

    const res = await API.post("/ai/ask", {
      message: "Ask me a DSA interview question"
    })

    setQuestion(res.data.reply)

    setAnswer("")
    setFeedback("")
    setTime(300)

  }


  // SUBMIT

  const submitAnswer = async () => {

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

    try {

      await API.post("/interview/save", {

        userId: user._id,
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

      <div className="bg-gray-900 text-white min-h-screen p-5">

        <h1>Interview Finished</h1>

        <h2>
          Score: {score} / {TOTAL_ROUNDS}
        </h2>

        <h2>
          {score >= 2 ? "PASS ✅" : "FAIL ❌"}
        </h2>

      </div>

    )

  }


  return (

    <div className="bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-xl">
        AI Interview Mode
      </h1>

      <h2>
        Round {round} / {TOTAL_ROUNDS}
      </h2>

      <h3 className="text-red-400">
        Timer: {formatTime()}
      </h3>


      <button
        onClick={getQuestion}
        className="bg-blue-500 px-3 py-1 mt-2"
      >
        Get Question
      </button>


      <p className="mt-3">
        {question}
      </p>


      <textarea
        className="w-full text-black mt-3"
        rows={5}
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)}
      />


      <button
        onClick={submitAnswer}
        className="bg-green-500 px-3 mt-2"
      >
        Submit
      </button>


      <button
        onClick={nextRound}
        className="bg-yellow-500 px-3 mt-2 ml-2"
      >
        Next
      </button>


      <h3 className="mt-3">
        Feedback
      </h3>

      <pre>{feedback}</pre>


      <h3>
        Score: {score}
      </h3>

    </div>

  )

}

export default InterviewMode