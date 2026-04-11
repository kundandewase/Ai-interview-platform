import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

// signup

router.post("/signup", async (req, res) => {

  const { username, email, password } = req.body

  try {

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email, and password" })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const userExists = await User.findOne({ email: normalizedEmail })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword
    })

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})


// login

router.post("/login", async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" })
  }

  const normalizedEmail = email.toLowerCase().trim()

  const user = await User.findOne({ email: normalizedEmail })

  if (!user) {

    return res.status(400).json({ message: "Invalid credentials" })

  }

  let isMatch = false

  // Supports hashed passwords and silently migrates legacy plain-text records.
  if (user.password?.startsWith("$2")) {
    isMatch = await bcrypt.compare(password, user.password)
  } else {
    isMatch = user.password === password
    if (isMatch) {
      user.password = await bcrypt.hash(password, 10)
      await user.save()
    }
  }

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "fallback_secret_change_me",
    { expiresIn: "1d" }
  )

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

})

export default router