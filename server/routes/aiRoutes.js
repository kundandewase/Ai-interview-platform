import express from "express"
import OpenAI from "openai"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config({ path: "./.env" })

const router = express.Router()
const AI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini"
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b"

const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY)
const openai = hasOpenAIKey
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

function fallbackInterviewReply(message) {
  const normalized = String(message || "").toLowerCase()

  if (normalized.includes("ask me a dsa interview question")) {
    return "Question: Given an array of integers, return the indices of two numbers whose sum is equal to a target value. Explain your approach and time complexity."
  }

  if (normalized.includes("check answer")) {
    const answerMatch = String(message).match(/Answer:\s*([\s\S]*?)\s*Check answer/i)
    const answerText = answerMatch ? answerMatch[1].trim() : ""

    if (!answerText || answerText.length < 10) {
      return "Wrong: your answer is too short. Explain the approach, complexity, and at least one edge case."
    }

    return "Correct: your answer is acceptable for this round. You explained the approach clearly."
  }

  return "AI service is running in fallback mode. Real AI is available if you either set OPENAI_API_KEY in server/.env or run local Ollama with OLLAMA_BASE_URL and OLLAMA_MODEL configured."
}

async function getOllamaReply(message) {
  const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
    model: OLLAMA_MODEL,
    prompt: `You are a coding interviewer. Ask DSA and coding questions. Keep replies concise and practical.\n\nCandidate message: ${message}`,
    stream: false
  }, {
    timeout: 30000
  })

  return response?.data?.response?.trim()
}


router.post("/ask", async (req, res) => {

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        error: "Message required"
      })
    }

    if (!openai) {
      try {
        const ollamaReply = await getOllamaReply(message)

        if (ollamaReply) {
          return res.json({
            reply: ollamaReply
          })
        }
      } catch (ollamaError) {
        console.log("Ollama unavailable, switching to fallback mode:", ollamaError.message)
      }

      return res.json({
        reply: fallbackInterviewReply(message)
      })
    }

    const completion = await openai.chat.completions.create({

      model: AI_MODEL,

      messages: [
        {
          role: "system",
          content: "You are a coding interviewer. Ask DSA and coding questions."
        },
        {
          role: "user",
          content: message
        }
      ],

    })

    const reply = completion?.choices?.[0]?.message?.content

    if (!reply) {
      return res.status(502).json({
        error: "AI provider returned an empty response"
      })
    }

    res.json({ reply })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

})

export default router