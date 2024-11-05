type AudioCorrectStepsProps = {
  steps: { number: number; label: string }[]
  currentStep: number
}

export const AudioCorrectSteps = ({
  steps,
  currentStep,
}: AudioCorrectStepsProps) => {
  return (
    <div className="flex justify-between">
      {steps.map((step) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-medium
                    ${
                      currentStep === step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-gray-300 text-gray-500"
                    }`}
            >
              {step.number}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
