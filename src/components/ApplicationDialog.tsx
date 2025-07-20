
import { createContext, useContext, ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import DynamicApplicationForm from '@/components/DynamicApplicationForm';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ApplicationDialogContextType {
  isOpen: boolean;
  openApplicationDialog: () => void;
  closeApplicationDialog: () => void;
}

const ApplicationDialogContext = createContext<ApplicationDialogContextType | undefined>(undefined);

export const ApplicationDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openApplicationDialog = () => {
    console.log('Opening application dialog');
    setIsOpen(true);
  };
  
  const closeApplicationDialog = () => {
    console.log('Closing application dialog');
    setIsOpen(false);
  };

  return (
    <ApplicationDialogContext.Provider value={{ isOpen, openApplicationDialog, closeApplicationDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold">Trading License Application</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 max-h-[calc(95vh-120px)]">
            <div className="px-6 pb-6">
              <ErrorBoundary>
                <DynamicApplicationForm />
              </ErrorBoundary>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </ApplicationDialogContext.Provider>
  );
};

export const useApplicationDialog = () => {
  const context = useContext(ApplicationDialogContext);
  if (!context) {
    console.error('useApplicationDialog must be used within an ApplicationDialogProvider');
    throw new Error('useApplicationDialog must be used within an ApplicationDialogProvider');
  }
  return context;
};
