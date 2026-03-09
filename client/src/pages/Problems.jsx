import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

function Problems() {

  const [problems, setProblems] = useState([])
  const [filter, setFilter] = useState("All")

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

    <div className="bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-2xl mb-4">
        Problems
      </h1>


      <div className="flex gap-2 mb-4">

        <button onClick={()=>setFilter("All")}
          className="bg-gray-700 px-3 py-1 rounded">
          All
        </button>

        <button onClick={()=>setFilter("Easy")}
          className="bg-green-600 px-3 py-1 rounded">
          Easy
        </button>

        <button onClick={()=>setFilter("Medium")}
          className="bg-yellow-600 px-3 py-1 rounded">
          Medium
        </button>

        <button onClick={()=>setFilter("Hard")}
          className="bg-red-600 px-3 py-1 rounded">
          Hard
        </button>

      </div>


      <div className="grid grid-cols-2 gap-4">

        {filteredProblems.map((p) => (

          <Link to={`/problems/${p._id}`} key={p._id}>

            <div className="bg-gray-800 p-4 rounded hover:bg-gray-700">

              <h2 className="text-lg">
                {p.title}
              </h2>

              <p className="text-yellow-400">
                {p.difficulty}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}

export default Problems