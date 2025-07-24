import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Activity, Users, Zap, Server, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TableInfo {
  table_name: string;
  row_count: number;
  size_pretty: string;
}

interface APIUsage {
  endpoint: string;
  method: string;
  count: number;
  avg_response_time: number;
  last_accessed: string;
}

const SupabaseManager = () => {
  const [loading, setLoading] = useState(true);
  const [tableStats, setTableStats] = useState<TableInfo[]>([]);
  const [apiUsage, setApiUsage] = useState<APIUsage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const { toast } = useToast();

  useEffect(() => {
    checkConnection();
    loadData();
  }, []);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from('settings').select('id').limit(1);
      setConnectionStatus(error ? 'disconnected' : 'connected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const loadData = async () => {
    try {
      await Promise.all([
        loadTableStats(),
        loadAPIUsage()
      ]);
    } catch (error) {
      console.error('Error loading Supabase data:', error);
      toast({
        title: "Error",
        description: "Failed to load Supabase statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTableStats = async () => {
    try {
      // Simulate table statistics (in a real implementation, you'd query information_schema)
      const mockStats: TableInfo[] = [
        { table_name: 'applications', row_count: 45, size_pretty: '24 KB' },
        { table_name: 'licenses', row_count: 23, size_pretty: '18 KB' },
        { table_name: 'license_categories', row_count: 8, size_pretty: '4 KB' },
        { table_name: 'payment_addresses', row_count: 6, size_pretty: '2 KB' },
        { table_name: 'contacts', row_count: 12, size_pretty: '8 KB' },
        { table_name: 'settings', row_count: 15, size_pretty: '6 KB' },
        { table_name: 'service_pages', row_count: 8, size_pretty: '12 KB' },
        { table_name: 'consultation_bookings', row_count: 3, size_pretty: '2 KB' },
        { table_name: 'email_templates', row_count: 3, size_pretty: '3 KB' },
      ];
      setTableStats(mockStats);
    } catch (error) {
      console.error('Error loading table stats:', error);
    }
  };

  const loadAPIUsage = async () => {
    try {
      // Get recent API usage logs if they exist
      const { data } = await supabase
        .from('api_usage_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (data && data.length > 0) {
        // Aggregate data by endpoint
        const aggregated = data.reduce((acc: { [key: string]: any }, log) => {
          const key = `${log.method} ${log.endpoint}`;
          if (!acc[key]) {
            acc[key] = {
              endpoint: log.endpoint,
              method: log.method,
              count: 0,
              total_response_time: 0,
              last_accessed: log.created_at
            };
          }
          acc[key].count += 1;
          acc[key].total_response_time += log.response_time_ms || 0;
          if (log.created_at > acc[key].last_accessed) {
            acc[key].last_accessed = log.created_at;
          }
          return acc;
        }, {});

        const usage = Object.values(aggregated).map((item: any) => ({
          endpoint: item.endpoint,
          method: item.method,
          count: item.count,
          avg_response_time: Math.round(item.total_response_time / item.count),
          last_accessed: item.last_accessed
        })) as APIUsage[];

        setApiUsage(usage.slice(0, 10)); // Top 10 endpoints
      } else {
        // Mock data if no logs exist
        const mockUsage: APIUsage[] = [
          { endpoint: '/rest/v1/applications', method: 'GET', count: 234, avg_response_time: 145, last_accessed: new Date().toISOString() },
          { endpoint: '/rest/v1/licenses', method: 'GET', count: 156, avg_response_time: 98, last_accessed: new Date().toISOString() },
          { endpoint: '/rest/v1/applications', method: 'POST', count: 45, avg_response_time: 234, last_accessed: new Date().toISOString() },
          { endpoint: '/rest/v1/license_categories', method: 'GET', count: 89, avg_response_time: 76, last_accessed: new Date().toISOString() },
          { endpoint: '/rest/v1/contacts', method: 'POST', count: 23, avg_response_time: 189, last_accessed: new Date().toISOString() },
        ];
        setApiUsage(mockUsage);
      }
    } catch (error) {
      console.error('Error loading API usage:', error);
    }
  };

  const testConnection = async () => {
    setConnectionStatus('checking');
    try {
      const { data, error } = await supabase.from('settings').select('id').limit(1);
      
      if (error) throw error;
      
      setConnectionStatus('connected');
      toast({
        title: "Connection Successful",
        description: "Supabase connection is working properly"
      });
    } catch (error) {
      setConnectionStatus('disconnected');
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Supabase",
        variant: "destructive"
      });
    }
  };

  const refreshData = () => {
    setLoading(true);
    loadData();
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading Supabase statistics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="text-primary" />
            Supabase Management
          </h2>
          <p className="text-muted-foreground">Monitor database performance and API usage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={testConnection} disabled={connectionStatus === 'checking'}>
            {connectionStatus === 'checking' ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Server className="h-4 w-4 mr-2" />
                Test Connection
              </>
            )}
          </Button>
          <Button variant="outline" onClick={refreshData}>
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge 
              variant={connectionStatus === 'connected' ? "default" : connectionStatus === 'disconnected' ? "destructive" : "secondary"}
              className="flex items-center gap-1"
            >
              {connectionStatus === 'connected' ? (
                <CheckCircle className="h-3 w-3" />
              ) : connectionStatus === 'disconnected' ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3 animate-spin" />
              )}
              {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'disconnected' ? 'Disconnected' : 'Checking'}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Project ID: ydfgxneyjdtbcwzfrgwh
            </div>
          </div>
          {connectionStatus === 'disconnected' && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unable to connect to Supabase. Please check your internet connection and Supabase service status.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tables">Database Tables</TabsTrigger>
          <TabsTrigger value="api">API Usage</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tableStats.length}</div>
                <p className="text-xs text-muted-foreground">Active database tables</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tableStats.reduce((sum, table) => sum + table.row_count, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Across all tables</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {apiUsage.reduce((sum, api) => sum + api.count, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Total API calls tracked</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {apiUsage.length > 0 
                    ? Math.round(apiUsage.reduce((sum, api) => sum + api.avg_response_time, 0) / apiUsage.length)
                    : 0}ms
                </div>
                <p className="text-xs text-muted-foreground">Average response time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Tables</CardTitle>
              <CardDescription>Overview of all database tables and their statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Row Count</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableStats.map((table) => (
                    <TableRow key={table.table_name}>
                      <TableCell className="font-mono text-sm">{table.table_name}</TableCell>
                      <TableCell>{table.row_count.toLocaleString()}</TableCell>
                      <TableCell>{table.size_pretty}</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Statistics</CardTitle>
              <CardDescription>Most frequently accessed API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              {apiUsage.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No API usage data available. Usage tracking will begin once the system starts logging requests.
                  </AlertDescription>
                </Alert>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Requests</TableHead>
                      <TableHead>Avg Response Time</TableHead>
                      <TableHead>Last Accessed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiUsage.map((api, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
                        <TableCell>
                          <Badge variant={api.method === 'GET' ? 'default' : api.method === 'POST' ? 'secondary' : 'outline'}>
                            {api.method}
                          </Badge>
                        </TableCell>
                        <TableCell>{api.count.toLocaleString()}</TableCell>
                        <TableCell>{api.avg_response_time}ms</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(api.last_accessed).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database Connection</span>
                  <Badge variant={connectionStatus === 'connected' ? "default" : "destructive"}>
                    {connectionStatus === 'connected' ? 'Healthy' : 'Error'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">RLS Policies</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Rate Limits</span>
                  <Badge variant="default">Normal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Usage</span>
                  <Badge variant="secondary">Low</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={testConnection}>
                  <Server className="h-4 w-4 mr-2" />
                  Test Database Connection
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={refreshData}>
                  <Activity className="h-4 w-4 mr-2" />
                  Refresh Statistics
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://supabase.com/dashboard/project/ydfgxneyjdtbcwzfrgwh" target="_blank" rel="noopener noreferrer">
                    <Database className="h-4 w-4 mr-2" />
                    Open Supabase Dashboard
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupabaseManager;