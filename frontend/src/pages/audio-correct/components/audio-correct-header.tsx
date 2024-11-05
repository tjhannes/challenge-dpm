import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type AudioCorrectStepsProps = {
  currentStep: number
  onCurrentStepChange: (step: number) => void
}

export const AudioCorrectHeader = ({
  currentStep,
  onCurrentStepChange,
}: AudioCorrectStepsProps) => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          disabled={currentStep === 1}
          onClick={() => onCurrentStepChange(Math.min(1, currentStep - 1))}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          disabled={currentStep === 3}
          onClick={() => onCurrentStepChange(Math.min(3, currentStep + 1))}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
