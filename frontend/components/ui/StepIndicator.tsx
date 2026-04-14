import { Check } from "lucide-react";

type StepIndicatorProps = {
  activeStep: number;
  totalSteps?: number;
};

export default function StepIndicator({ activeStep, totalSteps = 5 }: StepIndicatorProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isDone = step < activeStep;
          const isActive = step === activeStep;
          return (
            <div key={step} className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium ${
                  isDone || isActive
                    ? "border-[#0F2C5A] bg-[#0F2C5A] text-white"
                    : "border-[#E2E8F0] bg-white text-[#64748B]"
                }`}
              >
                {isDone ? <Check size={16} strokeWidth={1.5} /> : step}
              </div>
              {step < totalSteps ? <div className="mx-2 h-0.5 flex-1 bg-[#E2E8F0]" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
