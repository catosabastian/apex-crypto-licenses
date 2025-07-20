
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Eye, Check, X, Clock, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { dataManager, Application } from '@/utils/dataManager';

export const ApplicationsManager = () => {
  const [applications, setApplications] = useState<Application[]>(dataManager.getApplications());
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    const success = dataManager.updateApplication(appId, { status: newStatus });
    if (success) {
      setApplications(dataManager.getApplications());
      
      // If approved, generate license
      if (newStatus === 'approved') {
        const app = applications.find(a => a.id === appId);
        if (app) {
          const license = dataManager.addLicense({
            holder: app.name,
            type: `Category ${app.category}`,
            category: parseInt(app.category),
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'active',
            platforms: 'Binance, Kraken, Coinbase, KuCoin'
          });
          
          // Update application with license ID
          dataManager.updateApplication(appId, { licenseId: license.id });
          setApplications(dataManager.getApplications());
          
          toast({
            title: "Application Approved!",
            description: `License ${license.id} has been generated for ${app.name}`,
          });
        }
      } else {
        toast({
          title: "Status Updated",
          description: `Application status changed to ${newStatus}`,
        });
      }
    }
  };

  const handleUpdateApplication = (updates: Partial<Application>) => {
    if (!selectedApp) return;

    const success = dataManager.updateApplication(selectedApp.id, updates);
    if (success) {
      setApplications(dataManager.getApplications());
      setIsEditDialogOpen(false);
      toast({
        title: "Application Updated",
        description: "Application details have been updated successfully",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">License Applications</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {applications.filter(app => app.status === 'pending').length} Pending
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{app.name}</CardTitle>
                <CardDescription>{app.email}</CardDescription>
              </div>
              <Badge className={getStatusColor(app.status)}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-muted-foreground">Category {app.category}</p>
                </div>
                <div>
                  <p className="font-medium">Amount</p>
                  <p className="text-muted-foreground">{app.amount}</p>
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{app.date}</p>
                </div>
                <div>
                  <p className="font-medium">License ID</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {app.licenseId || 'Not generated'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex gap-2 flex-wrap">
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Application Details</DialogTitle>
                      <DialogDescription>
                        Full application information for {selectedApp?.name}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedApp && (
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <p className="text-sm text-muted-foreground">{selectedApp.name}</p>
                          </div>
                          <div>
                            <Label>Email</Label>
                            <p className="text-sm text-muted-foreground">{selectedApp.email}</p>
                          </div>
                          <div>
                            <Label>Category</Label>
                            <p className="text-sm text-muted-foreground">Category {selectedApp.category}</p>
                          </div>
                          <div>
                            <Label>Amount</Label>
                            <p className="text-sm text-muted-foreground">{selectedApp.amount}</p>
                          </div>
                        </div>
                        {selectedApp.notes && (
                          <div>
                            <Label>Notes</Label>
                            <p className="text-sm text-muted-foreground">{selectedApp.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Application</DialogTitle>
                      <DialogDescription>
                        Update application details and notes
                      </DialogDescription>
                    </DialogHeader>
                    {selectedApp && (
                      <ApplicationEditForm 
                        application={selectedApp} 
                        onUpdate={handleUpdateApplication}
                        onCancel={() => setIsEditDialogOpen(false)}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                {app.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(app.id, 'approved')}
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleStatusChange(app.id, 'rejected')}
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}

                {app.status === 'review' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(app.id, 'pending')}
                  >
                    Mark Pending
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ApplicationEditForm = ({ 
  application, 
  onUpdate, 
  onCancel 
}: { 
  application: Application; 
  onUpdate: (updates: Partial<Application>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    notes: application.notes || '',
    status: application.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: Application['status']) => 
          setFormData(prev => ({ ...prev, status: value }))
        }>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add internal notes about this application..."
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Update Application
        </Button>
      </DialogFooter>
    </form>
  );
};
