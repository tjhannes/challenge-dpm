import axios from "axios"

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:3000", // Point to backend server
  headers: { "Content-Type": "multipart/form-data" },
})

interface SubmitAudioResponse {
  data: {
    id: number
    status: string
  }
}

export const submitAudio = (
  email: string,
  audioFile: Blob
): Promise<SubmitAudioResponse> => {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("audio", audioFile)

  return api.post("/submit-audio", formData)
}

export const checkStatus = (id: number) => {
  return api.get(`/status/${id}`)
}
