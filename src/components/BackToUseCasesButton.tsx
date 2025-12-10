import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackToUseCasesButtonProps {
  onClick: () => void;
}

export function BackToUseCasesButton({ onClick }: BackToUseCasesButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="gap-2 h-11 px-6 text-sm bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-teal-600 transition-all shadow-sm rounded-lg"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Use Cases
    </Button>
  );
}
