const Problem = require("../models/Problem")

// Get all problems
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
    res.json(problems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get single problem
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
    res.json(problem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Add new problem
exports.createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body)
    await problem.save()

    res.status(201).json(problem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}