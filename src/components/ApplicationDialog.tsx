
import { createContext, useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import ApplicationForm from './ApplicationForm';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

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
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent 
              className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0" 
              aria-describedby="application-form-description"
            >
              <VisuallyHidden>
                <DialogTitle>License Application Form</DialogTitle>
              </VisuallyHidden>
              <p id="application-form-description" className="sr-only">
                Complete this form to apply for your official crypto trading license
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.22, 1, 0.36, 1],
                  staggerChildren: 0.1 
                }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <div className="bg-gradient-to-r from-accent/20 to-accent/5 p-4 flex items-center gap-3 border-b">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  <h2 className="text-xl font-semibold">Official License Application</h2>
                </div>
                <div className="p-6 bg-background">
                  <ApplicationForm onClose={closeApplicationDialog} />
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
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
