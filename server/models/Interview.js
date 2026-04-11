import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema({

  userId: String,

  score: Number,

  total: Number,

  result: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

})

const Interview = mongoose.model(
  "Interview",
  interviewSchema
)

export default Interview