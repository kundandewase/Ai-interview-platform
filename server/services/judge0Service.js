const axios = require("axios")

const JUDGE0_URL = "https://ce.judge0.com/submissions"

const runCode = async (source_code, language_id, stdin) => {
  try {

    const response = await axios.post(
      `${JUDGE0_URL}?base64_encoded=false&wait=true`,
      {
        source_code,
        language_id,
        stdin
      }
    )

    return response.data

  } catch (error) {
    throw error
  }
}

module.exports = runCode