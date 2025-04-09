
import { createContext, useContext, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ApplicationForm from './ApplicationForm';

interface ApplicationDialogContextType {
  isOpen: boolean;
  openApplicationDialog: () => void;
  closeApplicationDialog: () => void;
}

const ApplicationDialogContext = createContext<ApplicationDialogContextType | undefined>(undefined);

export function ApplicationDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openApplicationDialog = () => setIsOpen(true);
  const closeApplicationDialog = () => setIsOpen(false);

  return (
    <ApplicationDialogContext.Provider value={{ isOpen, openApplicationDialog, closeApplicationDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ApplicationForm onClose={closeApplicationDialog} />
        </DialogContent>
      </Dialog>
    </ApplicationDialogContext.Provider>
  );
}

export function useApplicationDialog() {
  const context = useContext(ApplicationDialogContext);
  if (context === undefined) {
    throw new Error('useApplicationDialog must be used within an ApplicationDialogProvider');
  }
  return context;
}
