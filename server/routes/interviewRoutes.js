import express from "express"
import Interview from "../models/Interview.js"

const router = express.Router()

// save result

router.post("/save", async (req, res) => {

  const { userId, score, total } = req.body

  const result = score >= 2 ? "PASS" : "FAIL"

  const data = await Interview.create({
    userId,
    score,
    total,
    result
  })

  res.json(data)

})


// get history

router.get("/:userId", async (req, res) => {

  const data = await Interview.find({
    userId: req.params.userId
  })

  res.json(data)

})


// leaderboard

router.get("/", async (req, res) => {

  const data = await Interview.find()
    .sort({ score: -1 })
    .limit(10)

  res.json(data)

})

export default router