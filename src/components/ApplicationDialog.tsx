
import { createContext, useContext, ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApplicationForm from '@/components/ApplicationForm';
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
        <DialogContent className="max-w-6xl max-h-[98vh] p-0 overflow-hidden glass-card border-0 shadow-2xl">
          <DialogHeader className="px-8 pt-8 pb-6 border-b border-border/50 relative">
            <DialogTitle className="text-3xl font-bold gradient-text">Trading License Application</DialogTitle>
            <p className="text-lg text-muted-foreground mt-2">
              Complete your application for cryptocurrency trading certification
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={closeApplicationDialog}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <ScrollArea className="flex-1 max-h-[calc(98vh-140px)]">
            <div className="px-8 pb-8">
              <ErrorBoundary>
                <div className="py-6">
                  <ApplicationForm onClose={closeApplicationDialog} />
                </div>
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
