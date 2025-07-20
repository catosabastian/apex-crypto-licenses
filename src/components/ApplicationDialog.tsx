
import { createContext, useContext, ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import DynamicApplicationForm from '@/components/DynamicApplicationForm';

interface ApplicationDialogContextType {
  isOpen: boolean;
  openApplicationDialog: () => void;
  closeApplicationDialog: () => void;
}

const ApplicationDialogContext = createContext<ApplicationDialogContextType | undefined>(undefined);

export const ApplicationDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openApplicationDialog = () => setIsOpen(true);
  const closeApplicationDialog = () => setIsOpen(false);

  return (
    <ApplicationDialogContext.Provider value={{ isOpen, openApplicationDialog, closeApplicationDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0">
          <DialogHeader className="px-8 pt-8 pb-4">
            <DialogTitle className="text-2xl font-bold">Trading License Application</DialogTitle>
          </DialogHeader>
          <ScrollArea className="px-8 pb-8">
            <DynamicApplicationForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </ApplicationDialogContext.Provider>
  );
};

export const useApplicationDialog = () => {
  const context = useContext(ApplicationDialogContext);
  if (!context) {
    throw new Error('useApplicationDialog must be used within an ApplicationDialogProvider');
  }
  return context;
};
