const Submission = require("../models/Submission")

// create submission
exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body)

    await submission.save()

    res.status(201).json(submission)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get user submissions
exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.params.userId })
      .populate("problem")

    res.json(submissions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}