import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/run", async (req, res) => {

  const { code, language_id, testCases } = req.body

  let results = []

  for (let test of testCases) {

    try {

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: language_id,
          stdin: test.input
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "YOUR_API_KEY",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
          }
        }
      )

      const output = response.data.stdout?.trim()

      if (output === test.output.trim()) {

        results.push("Accepted")

      } else {

        results.push("Wrong Answer")

      }

    } catch (error) {

      results.push("Runtime Error")

    }

  }

  res.json(results)

})

export default router