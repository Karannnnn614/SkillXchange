'use client';

import { useState, useEffect } from 'react';
import { Star, TrendingUp, CheckCircle, MessageCircle, Video, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface SwapRequest {
  id: string;
  requesterId: string;
  providerId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  message: string;
  proposedSchedule?: any;
  createdAt: string;
  updatedAt: string;
}

export function RequestsPage() {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/swap-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (
    requestId: string,
    action: 'accepted' | 'declined' | 'cancelled'
  ) => {
    try {
      const response = await fetch(`/api/swap-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Request ${action} successfully`,
        });
        fetchRequests(); // Refresh the list
      } else {
        throw new Error('Failed to update request');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update request',
        variant: 'destructive',
      });
    }
  };

  const getRequestsByType = (type: string) => {
    const currentUserId = 'user-1'; // Mock user ID - replace with actual user context

    switch (type) {
      case 'incoming':
        return requests.filter(
          (req) => req.providerId === currentUserId && req.status === 'pending'
        );
      case 'outgoing':
        return requests.filter((req) => req.requesterId === currentUserId);
      case 'completed':
        return requests.filter(
          (req) =>
            (req.providerId === currentUserId || req.requesterId === currentUserId) &&
            req.status === 'completed'
        );
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading requests...</div>
      </div>
    );
  }

  const incomingRequests = getRequestsByType('incoming');
  const outgoingRequests = getRequestsByType('outgoing');
  const completedRequests = getRequestsByType('completed');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Swap Requests</h2>
        <p className="text-gray-600">Manage your incoming and outgoing skill exchange requests</p>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incoming">
            Incoming
            <Badge className="ml-2 bg-blue-500 text-white">{incomingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="outgoing">
            Outgoing
            <Badge className="ml-2 bg-blue-500 text-white">{outgoingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <Badge className="ml-2 bg-blue-500 text-white">{completedRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-6 mt-6">
          {incomingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No incoming requests</div>
          ) : (
            incomingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>
                          {request.requesterId.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">User {request.requesterId}</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Wants to exchange:{' '}
                          <span className="font-medium text-blue-600">
                            {request.offeredSkillId}
                          </span>{' '}
                          for your{' '}
                          <span className="font-medium text-green-600">
                            {request.requestedSkillId}
                          </span>
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>4.8/5</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span>95% match</span>
                          </div>
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded-lg">
                          {request.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleRequestAction(request.id, 'accepted')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                        onClick={() => handleRequestAction(request.id, 'declined')}
                      >
                        Decline
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-6 mt-6">
          {outgoingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No outgoing requests</div>
          ) : (
            outgoingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>
                          {request.providerId.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">User {request.providerId}</h3>
                          <Badge
                            className={`text-white ${
                              request.status === 'pending'
                                ? 'bg-yellow-500'
                                : request.status === 'accepted'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          You offered:{' '}
                          <span className="font-medium text-blue-600">
                            {request.offeredSkillId}
                          </span>{' '}
                          for their{' '}
                          <span className="font-medium text-green-600">
                            {request.requestedSkillId}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Sent {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {request.status === 'pending' && (
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleRequestAction(request.id, 'cancelled')}
                        >
                          Cancel Request
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6 mt-6">
          {completedRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No completed swaps yet</div>
          ) : (
            completedRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>
                          {(request.requesterId === 'user-1'
                            ? request.providerId
                            : request.requesterId
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            User{' '}
                            {request.requesterId === 'user-1'
                              ? request.providerId
                              : request.requesterId}
                          </h3>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Skill exchange:{' '}
                          <span className="font-medium text-blue-600">
                            {request.offeredSkillId}
                          </span>{' '}
                          ↔{' '}
                          <span className="font-medium text-green-600">
                            {request.requestedSkillId}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Completed {new Date(request.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Rate Experience
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
