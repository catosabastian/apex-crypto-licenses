import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, UserPlus, Trash2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { adminUtils, type AdminUser } from '@/utils/adminUtils';

const AdminUserManager = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadAdminUsers();
  }, []);

  const loadAdminUsers = async () => {
    setIsLoading(true);
    try {
      const users = await adminUtils.getAdminUsers();
      setAdminUsers(users);
    } catch (error) {
      console.error('Error loading admin users:', error);
      toast({
        title: "Error",
        description: "Failed to load admin users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;

    setIsCreating(true);
    try {
      const result = await adminUtils.createAdminUser(newAdminEmail.trim());
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setNewAdminEmail('');
        await loadAdminUsers();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin User Management
          </CardTitle>
          <CardDescription>
            Manage administrator access and roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create New Admin */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Create New Admin</h3>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Only existing users can be granted admin access. The user must sign up first.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleCreateAdmin} className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="admin-email">User Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="user@example.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  disabled={isCreating || !newAdminEmail.trim()}
                  className="h-10"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isCreating ? 'Creating...' : 'Grant Admin'}
                </Button>
              </div>
            </form>
          </div>

          {/* Admin Users List */}
          <div>
            <h3 className="font-semibold mb-3">Current Administrators</h3>
            {isLoading ? (
              <div className="text-center py-4">Loading admin users...</div>
            ) : adminUsers.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No admin users found. Create the first admin user above.
                </AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManager;