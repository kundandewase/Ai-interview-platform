import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import Editor from "@monaco-editor/react"

function ProblemDetail() {

  const { id } = useParams()

  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("javascript")

  useEffect(() => {

    const fetchProblem = async () => {

      const res = await API.get(`/problems/${id}`)
      setProblem(res.data)

    }

    fetchProblem()

  }, [id])


  const runCode = async () => {

    const res = await API.post("/code/run", {
      code,
      language
    })

    setOutput(res.data)

  }


  if (!problem) return <div>Loading...</div>


  return (

    <div className="h-screen flex bg-[#1e1e1e] text-white">

      <div className="w-1/2 border-r border-gray-700 p-4">

        <h2 className="text-xl">
          {problem.title}
        </h2>

        <p>{problem.description}</p>

        <p className="text-yellow-400">
          {problem.difficulty}
        </p>

      </div>


      <div className="w-1/2 flex flex-col">

        <div className="bg-gray-800 p-2 flex gap-2">

          <select
            className="text-black"
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >

            <option>javascript</option>
            <option>python</option>
            <option>cpp</option>

          </select>

          <button
            onClick={runCode}
            className="bg-green-500 px-3"
          >
            Run
          </button>

        </div>


        <div className="flex-1">

          <Editor
            height="100%"
            theme="vs-dark"
            language="javascript"
            value={code}
            onChange={(v)=>setCode(v)}
          />

        </div>


        <div className="bg-black p-3 h-40">

          <pre>{output}</pre>

        </div>

      </div>

    </div>

  )

}

export default ProblemDetail