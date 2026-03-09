import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
import interviewRoutes from "./routes/interviewRoutes.js"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import problemRoutes from "./routes/problemRoutes.js"
import codeRoutes from "./routes/codeRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/ai-interview-platform")
.then(() => {
  console.log("MongoDB connected")
})
.catch((error) => {
  console.error("MongoDB connection error:", error)
})

// Routes
app.use("/api/problems", problemRoutes)
app.use("/api/code", codeRoutes)
app.use("/api/submissions", submissionRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/interview", interviewRoutes)
// Test route
app.get("/", (req, res) => {
  res.send("Server is running")
})

// Start server
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})