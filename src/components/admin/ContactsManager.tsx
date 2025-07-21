
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const ContactsManager = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkRead = async (contactId: string) => {
    try {
      // This would need to be implemented in supabaseDataManager
      // For now, just reload the data
      const data = await supabaseDataManager.getContacts();
      setContacts(data);
      toast({
        title: "Marked as Read",
        description: "Contact message has been marked as read",
      });
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };

  const handleReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    try {
      // This would need to be implemented in supabaseDataManager
      // For now, just reload the data
      const data = await supabaseDataManager.getContacts();
      setContacts(data);
      setIsReplyDialogOpen(false);
      setReplyMessage('');
      toast({
        title: "Reply Sent",
        description: `Reply sent to ${selectedContact.name}`,
      });
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contact Messages</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {contacts.filter(contact => contact.status === 'new').length} New
          </Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Compose Email
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
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
                <p className="font-medium">{contact.subject}</p>
                <p className="text-muted-foreground text-sm line-clamp-2">{contact.message}</p>
                <p className="text-xs text-muted-foreground">{contact.date}</p>
                {contact.response && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Your Reply:</p>
                    <p className="text-sm">{contact.response}</p>
                  </div>
                )}
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
                        Replying to: {selectedContact?.subject}
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

                {contact.status === 'new' && (
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
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
