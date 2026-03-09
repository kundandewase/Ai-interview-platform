import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema({

  problemId: String,

  code: String,

  language: String,

  result: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

})

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission