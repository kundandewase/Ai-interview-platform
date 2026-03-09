import express from "express"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const router = express.Router()

// Debug (check if key loaded)
console.log("OPENAI KEY =", process.env.OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // from .env
  // apiKey: "sk-your-key-here"  // ← use this if .env fails
})


router.post("/ask", async (req, res) => {

  try {

    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        error: "Message required"
      })
    }

    const completion = await openai.chat.completions.create({

      model: "gpt-4.1-mini",

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

    res.json({
      reply: completion.choices[0].message.content
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

})

export default router