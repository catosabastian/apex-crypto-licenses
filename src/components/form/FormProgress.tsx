
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps?: number[];
}

export const FormProgress = ({ 
  currentStep, 
  totalSteps, 
  stepLabels, 
  completedSteps = [] 
}: FormProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Application Progress</h3>
        <Badge variant="outline">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-white animate-pulse' 
                    : 'bg-muted border-muted-foreground text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : isCurrent ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              
              <div className="ml-2 hidden sm:block">
                <p className={`text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {label}
                </p>
              </div>
              
              {index < stepLabels.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
