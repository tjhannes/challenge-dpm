// inspired from https://gist.github.com/QasidLabeed/e0a6c272945cec4dfd3213187d8c588a
import { useState } from "react"

type UseAudioRecorderProps = {
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
  audioChunksRef: React.MutableRefObject<Blob[]>
}

export const useAudioRecorder = ({
  mediaRecorderRef,
  audioChunksRef,
}: UseAudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      })
      setAudioBlob(audioBlob)
      audioChunksRef.current = []
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  return {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    audioBlob,
  }
}
