import { useEffect, useState } from "react"
import API from "../services/api"

function InterviewHistory() {

  const [data, setData] = useState([])

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  useEffect(() => {

    const fetch = async () => {

      const res = await API.get(
        `/interview/${user._id}`
      )

      setData(res.data)

    }

    fetch()

  }, [])


  return (

    <div className="bg-gray-900 text-white min-h-screen p-5">

      <h1>Interview History</h1>

      {data.map((i) => (

        <div key={i._id}
          className="bg-gray-800 p-2 mt-2"
        >

          Score: {i.score}/{i.total}

          Result: {i.result}

        </div>

      ))}

    </div>

  )

}

export default InterviewHistory