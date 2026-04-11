import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  problemId: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  result: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission