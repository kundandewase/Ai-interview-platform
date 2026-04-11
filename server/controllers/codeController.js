const runCode = require("../services/judge0Service")

exports.executeCode = async (req, res) => {

  try {

    const { code, language_id, input } = req.body

    const result = await runCode(code, language_id, input)

    res.json(result)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}