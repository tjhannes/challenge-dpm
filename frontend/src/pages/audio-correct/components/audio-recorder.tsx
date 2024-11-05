import { Card } from "@/components/ui/card"
import { PlayCircle, StopCircle } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { submitAudio } from "../utils/api"
import { forwardRef } from "react"
import { useAudioRecorder } from "../utils/use-audio-recorder"

type AudioRecorderProps = {
  currentStep: number
}

export const AudioRecorder = forwardRef<HTMLInputElement, AudioRecorderProps>(
  ({ currentStep }, ref) => {
    const [email, setEmail] = useState("")
    const [isUploaded, setIsUploaded] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    const {
      handleStartRecording,
      handleStopRecording,
      isRecording,
      audioBlob,
    } = useAudioRecorder({
      mediaRecorderRef,
      audioChunksRef,
    })

    const handleSubmit = async () => {
      if (!email || !audioBlob) {
        toast.error("Please provide both an email and a recorded audio.")
        return
      }

      try {
        await submitAudio(email, audioBlob)
        setIsUploaded(true)
        toast.success("Audio submitted!")
      } catch (error) {
        toast.error("Failed to submit audio.")
        console.error(error)
      }
    }

    if (isUploaded) {
      return (
        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-lg font-semibold text-gray-600 mb-2 mt-6">
            Result
          </h2>
          <p className="text-sm text-gray-500">Audio is being processed... </p>
          <button
            onClick={() => toast("Refresh logic is not yet implemented")}
            className="mt-4 px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Refresh
          </button>
        </div>
      )
    }

    return (
      <div>
        {currentStep === 1 ? (
          <>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              ref={ref}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </>
        ) : (
          <></>
        )}

        {currentStep === 2 ? (
          <Card className="border-dashed flex flex-col items-center justify-center p-4">
            {!isRecording ? (
              <button onClick={handleStartRecording}>
                <div className="flex flex-col items-center justify-center p-12 cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    Record or upload a voice message
                  </h3>
                </div>
              </button>
            ) : (
              <button onClick={handleStopRecording}>
                <div className="flex flex-col items-center justify-center p-12 cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <StopCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Stop recording</h3>
                </div>
              </button>
            )}

            {audioBlob && (
              <audio controls>
                <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Card>
        ) : (
          <></>
        )}

        {currentStep === 3 ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="mb-2">Summary</h2>
            <p className="text-sm text-gray-500">{`Email: ${email}`}</p>
            <p className="text-sm text-gray-500">{`Files:1`}</p>
            <button
              onClick={handleSubmit}
              disabled={!audioBlob || !email}
              className={`mt-4 px-4 py-2 rounded-md text-white ${
                !audioBlob || !email
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              Submit
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
)
