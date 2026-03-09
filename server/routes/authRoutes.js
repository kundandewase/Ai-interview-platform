import express from "express"
import User from "../models/User.js"

const router = express.Router()

// signup

router.post("/signup", async (req, res) => {

  const { username, email, password } = req.body

  try {

    const user = await User.create({
      username,
      email,
      password
    })

    res.json(user)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})


// login

router.post("/login", async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email, password })

  if (!user) {

    return res.status(400).json({ message: "Invalid credentials" })

  }

  res.json(user)

})

export default router