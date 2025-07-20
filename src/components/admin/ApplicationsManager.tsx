import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabaseDataManager, Application } from '@/utils/supabaseDataManager';
import { Eye, CheckCircle, XCircle, Clock, User } from 'lucide-react';

export function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadApplications = async () => {
      const apps = await supabaseDataManager.getApplications();
      setApplications(apps);
    };

    const handleApplicationUpdate = (data: Application[]) => {
      setApplications(data);
    };

    supabaseDataManager.addEventListener('applications_updated', handleApplicationUpdate);
    loadApplications();

    return () => {
      supabaseDataManager.removeEventListener('applications_updated', handleApplicationUpdate);
    };
  }, []);

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      await supabaseDataManager.updateApplication(applicationId, { status: newStatus as any });
      
      toast({
        title: "Success",
        description: `Application status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock },
      processing: { variant: "default" as const, icon: Clock },
      approved: { variant: "default" as const, icon: CheckCircle },
      rejected: { variant: "destructive" as const, icon: XCircle }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Management</CardTitle>
        <CardDescription>
          Review and manage license applications from users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{applications.length}</div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600">
                  {applications.filter(app => app.status === 'pending').length}
                </div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'approved').length}
                </div>
                <p className="text-sm text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </div>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{application.name}</div>
                        <div className="text-sm text-muted-foreground">{application.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>Category {application.category}</TableCell>
                  <TableCell>{application.amount || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{formatDate(application.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>
                              Review and manage application for {selectedApplication?.name}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedApplication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Applicant Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Name:</span> {selectedApplication.name}</p>
                                    <p><span className="font-medium">Email:</span> {selectedApplication.email}</p>
                                    <p><span className="font-medium">Phone:</span> {selectedApplication.phone || 'N/A'}</p>
                                    <p><span className="font-medium">Company:</span> {selectedApplication.company || 'N/A'}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium">Application Details</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Category:</span> Category {selectedApplication.category}</p>
                                    <p><span className="font-medium">Amount:</span> {selectedApplication.amount || 'N/A'}</p>
                                    <p><span className="font-medium">Payment Method:</span> {selectedApplication.payment_method || 'N/A'}</p>
                                    <p><span className="font-medium">Transaction ID:</span> {selectedApplication.transaction_id || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {selectedApplication.notes && (
                                <div>
                                  <h4 className="font-medium">Additional Notes</h4>
                                  <p className="text-sm bg-muted p-3 rounded-md">{selectedApplication.notes}</p>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2">
                                <label className="font-medium">Update Status:</label>
                                <Select
                                  value={selectedApplication.status}
                                  onValueChange={(value) => handleStatusUpdate(selectedApplication.id, value)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {applications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No applications found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}