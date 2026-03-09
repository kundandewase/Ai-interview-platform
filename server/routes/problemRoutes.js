import express from "express"

const router = express.Router()

// Get all problems
router.get("/", async (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Two Sum",
      description: "Find two numbers that add up to the target.",
      difficulty: "Easy"
    }
  ])
})

// Get single problem
router.get("/:id", async (req, res) => {

  const problem = {
    _id: req.params.id,
    title: "Two Sum",
    description: "Find two numbers that add up to the target.",
    difficulty: "Easy"
  }

  res.json(problem)

})

export default router