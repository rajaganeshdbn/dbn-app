import { useCallback, useState } from 'react';

export type StepType = JSX.Element;

export interface UseStepperProps {
  initialStep?: number;
  steps: StepType[];
}

export interface UseStepperReturnType {
  stepCount: number;
  currentStep: StepType;
  goBack: () => void;
  goNext: () => void;
  isLastStep: boolean;
  isCompleted: boolean;
}

const useStepper = ({
  initialStep = 1,
  steps = [],
}: UseStepperProps): UseStepperReturnType => {
  const [step, setStep] = useState<number>(
    initialStep < 1 || initialStep > steps.length ? 1 : initialStep
  );
  const [isCompleted, setCompleted] = useState(false);

  const goBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  }, []);

  const goNext = useCallback(() => {
    setStep((prev) => {
      if (prev === steps.length) {
        setCompleted(true);
        return prev;
      }
      return prev + 1;
    });
  }, [steps.length]);

  return {
    stepCount: step,
    currentStep: steps[step - 1],
    goBack,
    goNext,
    isLastStep: steps.length === step,
    isCompleted,
  };
};

export default useStepper;
