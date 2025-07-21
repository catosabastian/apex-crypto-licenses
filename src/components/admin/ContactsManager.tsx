
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, CheckCircle, Trash, Archive } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager, Contact } from '@/utils/supabaseDataManager';

export const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const contactData = await supabaseDataManager.getContacts();
        setContacts(contactData);
      } catch (error) {
        console.error('Error loading contacts:', error);
        toast({
          title: "Error",
          description: "Failed to load contacts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleContactUpdate = (data: Contact[]) => {
      setContacts(data);
    };

    supabaseDataManager.addEventListener('contacts_updated', handleContactUpdate);
    loadContacts();

    return () => {
      supabaseDataManager.removeEventListener('contacts_updated', handleContactUpdate);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-purple-100 text-purple-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkRead = async (contactId: string) => {
    try {
      await supabaseDataManager.updateContact(contactId, { status: 'read' });
      toast({
        title: "Marked as Read",
        description: "Contact message has been marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive",
      });
    }
  };

  const handleArchive = async (contactId: string) => {
    try {
      await supabaseDataManager.updateContact(contactId, { status: 'archived' });
      toast({
        title: "Archived",
        description: "Contact message has been archived",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive contact",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (contactId: string) => {
    try {
      await supabaseDataManager.deleteContact(contactId);
      toast({
        title: "Deleted",
        description: "Contact message has been deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    }
  };

  const handleReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    try {
      await supabaseDataManager.updateContact(selectedContact.id, { 
        status: 'responded'
      });
      
      setIsReplyDialogOpen(false);
      setReplyMessage('');
      toast({
        title: "Reply Sent",
        description: `Reply sent to ${selectedContact.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    }
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Contact Messages</h2>
        <div className="text-center py-8">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contact Messages</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {contacts.filter(contact => contact.status === 'unread').length} New
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {contacts.length} Total
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No contact messages found</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <CardDescription>{contact.email}</CardDescription>
                </div>
                <Badge className={getStatusColor(contact.status)}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contact.subject && (
                    <p className="font-medium">{contact.subject}</p>
                  )}
                  <p className="text-muted-foreground text-sm line-clamp-2">{contact.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(contact.created_at)}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2">
                  <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Reply to {selectedContact?.name}</DialogTitle>
                        <DialogDescription>
                          Replying to: {selectedContact?.subject || 'No subject'}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedContact && (
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-2">Original Message:</p>
                            <p className="text-sm text-muted-foreground">{selectedContact.message}</p>
                          </div>
                          
                          <div>
                            <Label htmlFor="reply">Your Reply</Label>
                            <Textarea
                              id="reply"
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your reply here..."
                              className="min-h-32"
                            />
                          </div>
                        </div>
                      )}
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                          Send Reply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {contact.status === 'unread' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMarkRead(contact.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Read
                    </Button>
                  )}

                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleArchive(contact.id)}
                    className="flex items-center gap-1"
                  >
                    <Archive className="h-4 w-4" />
                    Archive
                  </Button>

                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
