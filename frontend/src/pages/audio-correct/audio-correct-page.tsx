import { useRef, useState } from "react"
import { AudioCorrectHeader } from "./components/audio-correct-header"
import { AudioCorrectSteps } from "./components/audio-correct-steps"
import { AudioRecorder } from "./components/audio-recorder"
import { toast } from "react-toastify"

export default function AudioCorrectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const STEPS = [
    { number: 1, label: "Information" },
    { number: 2, label: "Record audio" },
    { number: 3, label: "Submit" },
  ]

  const onCurrentStepChange = (step: number) => {
    if (step === 2) {
      if (emailRef.current) {
        const email = emailRef.current.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          toast.error("Please provide a valid email address.")
          return
        }
      }
    }
    setCurrentStep(step)
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <AudioCorrectHeader
          currentStep={currentStep}
          onCurrentStepChange={onCurrentStepChange}
        />

        <AudioCorrectSteps currentStep={currentStep} steps={STEPS} />

        <AudioRecorder currentStep={currentStep} ref={emailRef} />
      </div>
    </div>
  )
}
