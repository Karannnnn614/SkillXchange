'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SocketMessage {
  id: string;
  type: 'swap_request' | 'message' | 'notification' | 'user_status' | 'typing' | 'presence';
  data: any;
  timestamp: string;
}

export interface TypingIndicator {
  userId: string;
  username: string;
  conversationId: string;
  isTyping: boolean;
}

export interface PresenceUpdate {
  userId: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface UseSocketOptions {
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: SocketMessage) => void;
  onTyping?: (typing: TypingIndicator) => void;
  onPresence?: (presence: PresenceUpdate) => void;
  onError?: (error: any) => void;
  onTokenExpired?: () => void;
}

export function useSocket(userId?: string, options: UseSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userIdRef = useRef<string | undefined>(userId);

  const {
    autoConnect = true,
    reconnectAttempts = 5,
    reconnectDelay = 2000,
    onConnect,
    onDisconnect,
    onMessage,
    onTyping,
    onPresence,
    onError,
    onTokenExpired,
  } = options;

  // Enhanced room naming strategy
  const createRoomName = (type: string, ...identifiers: string[]): string => {
    const sortedIds = identifiers.sort(); // Ensure consistent room names
    return `${type}_${sortedIds.join('_')}`;
  };

  // Token validation helper
  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  };

  const connect = useCallback(() => {
    if (socketRef.current?.connected || isReconnecting) return;

    const token = localStorage.getItem('auth_token');
    if (!token || !userId) return;

    // Check token validity
    if (!isTokenValid(token)) {
      onTokenExpired?.();
      return;
    }

    setIsReconnecting(true);
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

    socketRef.current = io(socketUrl, {
      auth: {
        token,
        userId,
      },
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setIsReconnecting(false);
      setConnectionAttempts(0);
      onConnect?.();
    });

    socketRef.current.on('disconnect', (reason: string) => {
      setIsConnected(false);
      setIsReconnecting(false);
      onDisconnect?.();

      // Auto-reconnect logic
      if (reason !== 'io client disconnect' && connectionAttempts < reconnectAttempts) {
        const delay = Math.min(reconnectDelay * Math.pow(2, connectionAttempts), 30000);
        setTimeout(() => {
          setConnectionAttempts((prev) => prev + 1);
          connect();
        }, delay);
      }
    });

    socketRef.current.on('connect_error', (error: any) => {
      setIsReconnecting(false);

      // Handle token expiry
      if (error.message?.includes('token') || error.message?.includes('auth')) {
        onTokenExpired?.();
        return;
      }

      onError?.(error);

      // Retry connection
      if (connectionAttempts < reconnectAttempts) {
        const delay = Math.min(reconnectDelay * Math.pow(2, connectionAttempts), 30000);
        setTimeout(() => {
          setConnectionAttempts((prev) => prev + 1);
          connect();
        }, delay);
      }
    });

    socketRef.current.on('message', (message: SocketMessage) => {
      setLastMessage(message);
      onMessage?.(message);
    });

    socketRef.current.on('error', (error: any) => {
      console.error('Socket error:', error);
      onError?.(error);
    });

    // Enhanced event listeners
    socketRef.current.on('swap_request', (data: any) => {
      const message: SocketMessage = {
        id: data.id,
        type: 'swap_request',
        data,
        timestamp: new Date().toISOString(),
      };
      setLastMessage(message);
      onMessage?.(message);
    });

    socketRef.current.on('new_message', (data: any) => {
      const message: SocketMessage = {
        id: data.id,
        type: 'message',
        data,
        timestamp: new Date().toISOString(),
      };
      setLastMessage(message);
      onMessage?.(message);
    });

    socketRef.current.on('notification', (data: any) => {
      const message: SocketMessage = {
        id: data.id,
        type: 'notification',
        data,
        timestamp: new Date().toISOString(),
      };
      setLastMessage(message);
      onMessage?.(message);
    });

    socketRef.current.on('user_status', (data: any) => {
      const message: SocketMessage = {
        id: data.userId,
        type: 'user_status',
        data,
        timestamp: new Date().toISOString(),
      };
      setLastMessage(message);
      onMessage?.(message);
      onPresence?.(data);
    });

    // Typing indicators
    socketRef.current.on('typing', (data: TypingIndicator) => {
      onTyping?.(data);
    });

    // Presence updates
    socketRef.current.on('presence', (data: PresenceUpdate) => {
      onPresence?.(data);
    });
  }, [
    userId,
    isReconnecting,
    connectionAttempts,
    reconnectAttempts,
    reconnectDelay,
    onConnect,
    onDisconnect,
    onMessage,
    onTyping,
    onPresence,
    onError,
    onTokenExpired,
  ]);

  // Debounced reconnect function
  const debouncedReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      if (userIdRef.current && !socketRef.current?.connected) {
        connect();
      }
    }, 500); // 500ms debounce
  }, [connect]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setIsReconnecting(false);
    }
  }, []);

  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const joinRoom = useCallback(
    (room: string) => {
      emit('join_room', { room });
    },
    [emit]
  );

  const leaveRoom = useCallback(
    (room: string) => {
      emit('leave_room', { room });
    },
    [emit]
  );

  const sendMessage = useCallback(
    (recipientId: string, content: string) => {
      emit('send_message', {
        recipientId,
        content,
        timestamp: new Date().toISOString(),
      });
    },
    [emit]
  );

  const updateUserStatus = useCallback(
    (status: 'online' | 'offline' | 'away') => {
      emit('user_status', { status });
    },
    [emit]
  );

  // Enhanced typing indicators
  const startTyping = useCallback(
    (conversationId: string) => {
      emit('typing_start', { conversationId });
    },
    [emit]
  );

  const stopTyping = useCallback(
    (conversationId: string) => {
      emit('typing_stop', { conversationId });
    },
    [emit]
  );

  // Join conversation room with enhanced naming
  const joinConversation = useCallback(
    (conversationId: string) => {
      const roomName = createRoomName('conversation', conversationId);
      joinRoom(roomName);
    },
    [joinRoom, createRoomName]
  );

  const leaveConversation = useCallback(
    (conversationId: string) => {
      const roomName = createRoomName('conversation', conversationId);
      leaveRoom(roomName);
    },
    [leaveRoom, createRoomName]
  );

  // Join user-specific rooms
  const joinUserRoom = useCallback(
    (targetUserId: string) => {
      if (!userId) return;
      const roomName = createRoomName('user', userId, targetUserId);
      joinRoom(roomName);
    },
    [joinRoom, createRoomName, userId]
  );

  // Update userIdRef when userId changes
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // Auto-connect effect
  useEffect(() => {
    if (autoConnect && userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userId, autoConnect, connect, disconnect]);

  // Debounced reconnect on userId change
  useEffect(() => {
    if (userId && userId !== userIdRef.current) {
      debouncedReconnect();
    }
  }, [userId, debouncedReconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    lastMessage,
    connectionAttempts,
    isReconnecting,
    connect,
    disconnect,
    emit,
    joinRoom,
    leaveRoom,
    sendMessage,
    updateUserStatus,
    startTyping,
    stopTyping,
    joinConversation,
    leaveConversation,
    joinUserRoom,
    createRoomName,
  };
}

// Custom hook for notifications with enhanced features
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<SocketMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const { isConnected } = useSocket(userId, {
    onMessage: (message) => {
      if (message.type === 'notification') {
        setNotifications((prev) => [message, ...prev].slice(0, 50)); // Keep last 50 notifications
        setUnreadCount((prev) => prev + 1);
      }
    },
  });

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, isRead: true } } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, data: { ...n.data, isRead: true } })));
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    clearNotification,
    clearAllNotifications,
    markAllAsRead,
  };
}

// Custom hook for real-time messages with typing indicators
export function useRealTimeMessages(userId?: string, conversationId?: string) {
  const [messages, setMessages] = useState<SocketMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const socket = useSocket(userId, {
    onConnect: () => {
      if (conversationId) {
        socket.joinConversation(conversationId);
      }
    },
    onMessage: (message) => {
      if (message.type === 'message') {
        setMessages((prev) => [...prev, message]);
      }
    },
    onTyping: (typing) => {
      if (typing.conversationId === conversationId) {
        setTypingUsers((prev) => {
          const filtered = prev.filter((t) => t.userId !== typing.userId);
          return typing.isTyping ? [...filtered, typing] : filtered;
        });
      }
    },
  });

  // Auto-join conversation room
  useEffect(() => {
    if (conversationId && socket.isConnected) {
      socket.joinConversation(conversationId);
    }

    return () => {
      if (conversationId && socket.isConnected) {
        socket.leaveConversation(conversationId);
      }
    };
  }, [conversationId, socket.isConnected, socket]);

  // Enhanced typing indicators with auto-stop
  const handleTyping = useCallback(() => {
    if (!conversationId) return;

    socket.startTyping(conversationId);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Auto-stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.stopTyping(conversationId);
    }, 3000);
  }, [conversationId, socket]);

  const stopTyping = useCallback(() => {
    if (!conversationId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.stopTyping(conversationId);
  }, [conversationId, socket]);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    messages,
    typingUsers,
    isConnected: socket.isConnected,
    sendMessage: socket.sendMessage,
    handleTyping,
    stopTyping,
  };
}

// Custom hook for presence updates
export function usePresence(userId?: string) {
  const [userPresence, setUserPresence] = useState<Map<string, PresenceUpdate>>(new Map());

  const socket = useSocket(userId, {
    onPresence: (presence) => {
      setUserPresence((prev) => new Map(prev.set(presence.userId, presence)));
    },
    onConnect: () => {
      // Update own status to online
      socket.updateUserStatus('online');
    },
    onDisconnect: () => {
      // Status will be updated server-side to offline
    },
  });

  const updateStatus = useCallback(
    (status: 'online' | 'offline' | 'away') => {
      socket.updateUserStatus(status);
    },
    [socket]
  );

  const getUserStatus = useCallback(
    (targetUserId: string): PresenceUpdate | undefined => {
      return userPresence.get(targetUserId);
    },
    [userPresence]
  );

  const isUserOnline = useCallback(
    (targetUserId: string): boolean => {
      const presence = userPresence.get(targetUserId);
      return presence?.status === 'online';
    },
    [userPresence]
  );

  return {
    userPresence: Array.from(userPresence.values()),
    isConnected: socket.isConnected,
    updateStatus,
    getUserStatus,
    isUserOnline,
  };
}
