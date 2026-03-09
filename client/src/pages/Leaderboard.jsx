import { useEffect, useState } from "react"
import API from "../services/api"

function Leaderboard() {

  const [data, setData] = useState([])

  useEffect(() => {

    const fetch = async () => {

      const res = await API.get("/interview")

      setData(res.data)

    }

    fetch()

  }, [])


  return (

    <div className="bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-xl mb-3">
        Leaderboard
      </h1>

      {data.map((i, index) => (

        <div
          key={i._id}
          className="bg-gray-800 p-2 mt-2"
        >

          Rank {index + 1}

          | Score {i.score}/{i.total}

          | {i.result}

        </div>

      ))}

    </div>

  )

}

export default Leaderboard