import express from "express"
import axios from "axios"

const router = express.Router()

const LANGUAGE_ID_MAP = {
  javascript: 63,
  python: 71,
  cpp: 54
}

router.post("/run", async (req, res) => {

  const { code, language, language_id, input = "" } = req.body

  if (!code) {
    return res.status(400).json({ message: "Code is required" })
  }

  const resolvedLanguageId = language_id || LANGUAGE_ID_MAP[language]

  if (!resolvedLanguageId) {
    return res.status(400).json({
      message: "Invalid language. Use javascript, python, cpp or provide language_id"
    })
  }

  try {

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: resolvedLanguageId,
        stdin: input
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    )

    const data = response.data

    res.json({
      status: data.status?.description || "Unknown",
      stdout: data.stdout || "",
      stderr: data.stderr || "",
      compile_output: data.compile_output || "",
      time: data.time || null,
      memory: data.memory || null
    })

  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Code execution failed"
    res.status(500).json({ message })
  }

})

export default router