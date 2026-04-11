import express from "express"
import Submission from "../models/Submission.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { userId, problemId, code, language, result } = req.body

    if (!userId || !problemId || !code || !language) {
      return res.status(400).json({
        message: "userId, problemId, code and language are required"
      })
    }

    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      result: result || "Pending"
    })

    res.status(201).json(submission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/:userId", async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })

    res.json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router