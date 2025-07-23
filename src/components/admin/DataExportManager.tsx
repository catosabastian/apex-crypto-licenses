import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Download, 
  FileText, 
  Database, 
  Users, 
  Mail,
  CreditCard,
  Settings,
  Calendar,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ExportOption {
  id: string;
  table: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  estimated_size: string;
}

interface ExportJob {
  id: string;
  table: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  downloadUrl?: string;
  error?: string;
}

export const DataExportManager: React.FC = () => {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions: ExportOption[] = [
    {
      id: 'applications',
      table: 'applications',
      name: 'License Applications',
      description: 'All license application data including status and documents',
      icon: <FileText className="h-4 w-4" />,
      estimated_size: '~2-5 MB',
    },
    {
      id: 'contacts',
      table: 'contacts',
      name: 'Contact Messages',
      description: 'All contact form submissions and inquiries',
      icon: <Mail className="h-4 w-4" />,
      estimated_size: '~500 KB',
    },
    {
      id: 'licenses',
      table: 'licenses',
      name: 'Issued Licenses',
      description: 'All issued licenses with holder information',
      icon: <Database className="h-4 w-4" />,
      estimated_size: '~1-3 MB',
    },
    {
      id: 'users',
      table: 'user_roles',
      name: 'User Roles',
      description: 'User roles and permissions data',
      icon: <Users className="h-4 w-4" />,
      estimated_size: '~100 KB',
    },
    {
      id: 'payments',
      table: 'payment_addresses',
      name: 'Payment Addresses',
      description: 'Cryptocurrency payment addresses and QR codes',
      icon: <CreditCard className="h-4 w-4" />,
      estimated_size: '~200 KB',
    },
    {
      id: 'settings',
      table: 'settings',
      name: 'System Settings',
      description: 'All system configuration and settings',
      icon: <Settings className="h-4 w-4" />,
      estimated_size: '~50 KB',
    },
    {
      id: 'content',
      table: 'content',
      name: 'Website Content',
      description: 'All CMS content and page data',
      icon: <FileText className="h-4 w-4" />,
      estimated_size: '~300 KB',
    },
    {
      id: 'audit',
      table: 'admin_audit_log',
      name: 'Audit Logs',
      description: 'All admin actions and system audit logs',
      icon: <Calendar className="h-4 w-4" />,
      estimated_size: '~1-2 MB',
    },
  ];

  const handleTableSelection = (tableId: string, checked: boolean) => {
    if (checked) {
      setSelectedTables(prev => [...prev, tableId]);
    } else {
      setSelectedTables(prev => prev.filter(id => id !== tableId));
    }
  };

  const selectAllTables = () => {
    setSelectedTables(exportOptions.map(option => option.id));
  };

  const clearSelection = () => {
    setSelectedTables([]);
  };

  const exportTableData = async (table: string): Promise<Blob> => {
    const { data, error } = await supabase
      .from(table as any)
      .select('*');

    if (error) {
      throw new Error(`Failed to export ${table}: ${error.message}`);
    }

    // Convert to CSV format
    if (!data || data.length === 0) {
      return new Blob(['No data available'], { type: 'text/csv' });
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          const stringValue = String(value);
          // Escape quotes and wrap in quotes if contains comma or quote
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ].join('\n');

    return new Blob([csvContent], { type: 'text/csv' });
  };

  const startExport = async () => {
    if (selectedTables.length === 0) {
      toast.error('Please select at least one table to export');
      return;
    }

    setIsExporting(true);
    
    // Initialize export jobs
    const initialJobs = selectedTables.map(tableId => ({
      id: tableId,
      table: exportOptions.find(opt => opt.id === tableId)?.table || tableId,
      status: 'pending' as const,
      progress: 0,
    }));
    
    setExportJobs(initialJobs);

    for (let i = 0; i < selectedTables.length; i++) {
      const tableId = selectedTables[i];
      const option = exportOptions.find(opt => opt.id === tableId);
      
      if (!option) continue;

      try {
        // Update job status to running
        setExportJobs(prev => prev.map(job => 
          job.id === tableId 
            ? { ...job, status: 'running', progress: 0 }
            : job
        ));

        // Simulate progress
        for (let progress = 0; progress <= 90; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setExportJobs(prev => prev.map(job => 
            job.id === tableId 
              ? { ...job, progress }
              : job
          ));
        }

        // Export the data
        const blob = await exportTableData(option.table);
        const url = URL.createObjectURL(blob);
        
        // Update job status to completed
        setExportJobs(prev => prev.map(job => 
          job.id === tableId 
            ? { ...job, status: 'completed', progress: 100, downloadUrl: url }
            : job
        ));

        // Auto-download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${option.table}_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      } catch (error) {
        console.error(`Export failed for ${option.table}:`, error);
        
        setExportJobs(prev => prev.map(job => 
          job.id === tableId 
            ? { 
                ...job, 
                status: 'failed', 
                progress: 0, 
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            : job
        ));
      }
    }

    setIsExporting(false);
    toast.success('Export completed! Files have been downloaded.');
  };

  const downloadFile = (job: ExportJob) => {
    if (job.downloadUrl) {
      const a = document.createElement('a');
      a.href = job.downloadUrl;
      a.download = `${job.table}_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const clearExportHistory = () => {
    // Clean up blob URLs
    exportJobs.forEach(job => {
      if (job.downloadUrl) {
        URL.revokeObjectURL(job.downloadUrl);
      }
    });
    setExportJobs([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Data Export & Backup</h2>
          <p className="text-muted-foreground">Export database tables to CSV files for backup or analysis</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={clearExportHistory} variant="outline" disabled={exportJobs.length === 0}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear History
          </Button>
          <Button onClick={startExport} disabled={isExporting || selectedTables.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Start Export'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Tables to Export</CardTitle>
            <CardDescription>Choose which database tables you want to export</CardDescription>
            <div className="flex gap-2 pt-2">
              <Button onClick={selectAllTables} variant="outline" size="sm">
                Select All
              </Button>
              <Button onClick={clearSelection} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={option.id}
                  checked={selectedTables.includes(option.id)}
                  onCheckedChange={(checked) => handleTableSelection(option.id, !!checked)}
                  disabled={isExporting}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <Label htmlFor={option.id} className="font-medium cursor-pointer">
                      {option.name}
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      {option.estimated_size}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Export Status */}
        <Card>
          <CardHeader>
            <CardTitle>Export Status</CardTitle>
            <CardDescription>
              {exportJobs.length === 0 
                ? 'No exports running'
                : `${exportJobs.filter(j => j.status === 'completed').length}/${exportJobs.length} completed`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {exportJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select tables and start export to see progress here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {exportJobs.map((job) => (
                  <div key={job.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {job.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {job.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {job.status === 'running' && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                        <span className="font-medium">{job.table}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          job.status === 'completed' ? 'default' :
                          job.status === 'failed' ? 'destructive' :
                          job.status === 'running' ? 'secondary' : 'outline'
                        }>
                          {job.status}
                        </Badge>
                        {job.status === 'completed' && job.downloadUrl && (
                          <Button
                            onClick={() => downloadFile(job)}
                            size="sm"
                            variant="outline"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {job.status !== 'pending' && (
                      <Progress value={job.progress} className="h-2" />
                    )}
                    {job.error && (
                      <p className="text-sm text-red-600">{job.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedTables.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ready to export {selectedTables.length} table(s)</p>
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedTables.map(id => exportOptions.find(opt => opt.id === id)?.name).join(', ')}
                </p>
              </div>
              <Button onClick={startExport} disabled={isExporting}>
                <Download className="h-4 w-4 mr-2" />
                Export Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataExportManager;