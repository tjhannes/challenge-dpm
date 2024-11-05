const express = require("express")
const cors = require("cors")
const multer = require("multer")
const { processAudio } = require("./controllers/audio-controller")

const app = express()
const port = 3000

// Configure CORS for frontend requests
app.use(cors())

// Configure multer for file upload handling (temporary storage)
const upload = multer({ dest: "uploads/" })

// Endpoint to receive audio file and email
app.post("/submit-audio", upload.single("audio"), async (req, res) => {
  const { email } = req.body
  const audioFile = req.file

  try {
    if (!email || !audioFile) {
      return res
        .status(400)
        .json({ error: "Email and audio file are required." })
    }

    // Call processAudio stub for audio handling
    const processingResult = await processAudio(email, audioFile)

    return res.status(200).json({
      message: "Audio received and processing started.",
      statusUrl: `/status/${processingResult.id}`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error." })
  }
})

// Endpoint to check the status of audio processing (stubbed)
app.get("/status/:id", (req, res) => {
  const { id } = req.params
  // Simulated response (in practice, this would check a database or processing queue)
  return res.json({
    id,
    status: "processing", // Options could be "processing", "completed", or "failed"
    correctedAudioUrl: null, // This would be a URL to the processed audio file if "completed"
  })
})

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`)
})
