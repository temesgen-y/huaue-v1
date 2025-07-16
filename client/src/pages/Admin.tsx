import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MessageSquare, Newspaper, TrendingUp, Users } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  submittedAt: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    if (user) {
      setAdminUser(JSON.parse(user));
    }

    fetchMessages();
  }, [setLocation]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setLocation('/admin/login');
      } else {
        setError('Failed to fetch messages');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: number) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
      }
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setLocation('/admin/login');
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const totalMessages = messages.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="/huayue-logo.png" 
                alt="HUAYUE PLASTICS INDUSTRY" 
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome, {adminUser?.email || 'Admin'}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Admin Dashboard */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">News Management</h3>
                  <p className="text-gray-600 text-sm">Create, edit, and manage news articles</p>
                </div>
                <Button
                  onClick={() => setLocation('/admin/news')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  Manage News
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Messages</h3>
                  <p className="text-gray-600 text-sm">View and respond to contact form submissions</p>
                </div>
                <Button
                  onClick={() => setLocation('/admin/messages')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
              </div>
            </Card>
          </div>

          {/* Messages Section */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMessages}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Read Messages</CardTitle>
                  <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{totalMessages - unreadCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Messages List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Contact form submissions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                          message.isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-primary shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {message.name}
                              </h3>
                              {!message.isRead && (
                                <Badge variant="default" className="bg-primary text-white">
                                  New
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-800">Email:</p>
                                <p className="break-all">{message.email}</p>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-800">Phone:</p>
                                <p>{message.phone}</p>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-800">Subject:</p>
                                <p>{message.subject}</p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <p className="font-medium text-gray-800 mb-2">Message:</p>
                              <div className="bg-gray-100 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              Submitted: {new Date(message.submittedAt).toLocaleString()}
                            </div>
                          </div>
                          
                          {!message.isRead && (
                            <Button
                              onClick={() => markAsRead(message.id)}
                              size="sm"
                              className="ml-4 bg-primary hover:bg-primary/90"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}