import { io, Socket } from 'socket.io-client';

// Define types
interface User {
  id: string;
  // Using unknown instead of any for better type safety
  [key: string]: unknown;
}

interface OnlineStatusData {
  user: User;
  onlineCount: number;
}

interface OnlineUsersListData {
  users: User[];
  count: number;
}

interface ForcedLogoutData {
  message?: string;
}

// Socket instance
let socket: Socket | null = null;
let heartbeatInterval: NodeJS.Timeout | null = null;

// Initialize socket connection
export const initializeSocket = (serverUrl: string = 'http://your-server-url:4002') => {
  if (socket) return socket;

  socket = io(serverUrl, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000
  });

  // Set up event listeners
  socket.on('connect', () => {
    console.log('Socket connected with id:', socket?.id);
    
    // Register user online after successful login
    const userId = localStorage.getItem('userId');
    if (userId && socket) {
      socket.emit('user-login', { id: userId });
    }
    
    // Start heartbeat
    startHeartbeat();
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    stopHeartbeat();
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`Socket reconnected after ${attemptNumber} attempts`);
    
    // Re-register online status if user is logged in
    const userId = localStorage.getItem('userId');
    if (userId && socket) {
      socket.emit('user-login', { id: userId });
      startHeartbeat();
    }
  });

  // Set up event listeners for online/offline events
  setupOnlineOfflineListeners();

  // Handle visibility change
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Handle network status change
  window.addEventListener('online', handleNetworkOnline);
  window.addEventListener('offline', handleNetworkOffline);
  
  // Handle beforeunload
  window.addEventListener('beforeunload', handleBeforeUnload);

  return socket;
};

// Start heartbeat to maintain online status
export const startHeartbeat = () => {
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  
  heartbeatInterval = setInterval(() => {
    if (socket && socket.connected && isMainTab()) {
      socket.emit('user-activity');
    }
  }, 30000); // 30 seconds
};

// Stop heartbeat
export const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

// Handle user login
export const handleUserLogin = (userData: { user: { _id: string }; token: string }) => {
  // Save user info
  localStorage.setItem('userId', userData.user._id);
  
  // Register user online
  if (socket) {
    socket.emit('user-login', { id: userData.user._id });
    startHeartbeat();
  }
};

// Handle user logout
export const handleUserLogout = () => {
  if (socket) {
    socket.emit('user-logout');
  }
  
  stopHeartbeat();
  localStorage.removeItem('userId');
};

// Set up listeners for online/offline events
const setupOnlineOfflineListeners = () => {
  if (!socket) return;

  // Listen for user online events
  socket.on('user-came-online', (data: OnlineStatusData) => {
    console.log('User came online:', data.user);
    console.log('Total online users:', data.onlineCount);
    
    // You can dispatch to state management or use callbacks
    if (onlineStatusCallbacks.userCameOnline) {
      onlineStatusCallbacks.userCameOnline(data);
    }
  });

  // Listen for user offline events
  socket.on('user-went-offline', (data: OnlineStatusData) => {
    console.log('User went offline:', data.user);
    console.log('Total online users:', data.onlineCount);
    
    if (onlineStatusCallbacks.userWentOffline) {
      onlineStatusCallbacks.userWentOffline(data);
    }
  });

  // Receive online users list
  socket.on('online-users-list', (data: OnlineUsersListData) => {
    console.log('Online users list:', data.users);
    console.log('Total online count:', data.count);
    
    if (onlineStatusCallbacks.onlineUsersList) {
      onlineStatusCallbacks.onlineUsersList(data);
    }
  });

  // Forced logout by admin
  socket.on('forced-logout', (data: ForcedLogoutData) => {
    alert(data.message || 'You have been logged out by admin');
    handleUserLogout();
    
    // Redirect to login page
    window.location.href = '/signin';
  });
};

// Handle tab visibility change
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    // User returned to tab
    if (socket && !socket.connected && localStorage.getItem('userId')) {
      // Try to reconnect if socket is disconnected
      socket.connect();
    }
  }
};

// Handle network status change
const handleNetworkOnline = () => {
  console.log('Network connection restored');
  if (socket && !socket.connected && localStorage.getItem('userId')) {
    socket.connect();
  }
};

const handleNetworkOffline = () => {
  console.log('Network connection lost');
  // You can show notification to user
};

// Handle before unload
const handleBeforeUnload = () => {
  if (socket && isMainTab()) {
    socket.emit('user-logout');
  }
};

// Tab management
const tabId = Date.now().toString();
localStorage.setItem('currentTabId', tabId);

// Check if this is the main tab
export const isMainTab = () => {
  return localStorage.getItem('currentTabId') === tabId;
};

// Verify online status periodically
export const startOnlineStatusVerification = () => {
  setInterval(verifyOnlineStatus, 2 * 60 * 1000); // Every 2 minutes
};

// Verify online status with server
const verifyOnlineStatus = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  
  try {
    const response = await fetch(`/api/v1/users/${userId}/online-status`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    
    const data = await response.json();
    const serverStatus = data.data.isOnline;
    
    // If server thinks user is offline but client thinks online
    if (!serverStatus && socket && socket.connected) {
      console.log('Zombie state detected, re-registering online status');
      socket.emit('user-login', { id: userId });
    }
  } catch (error) {
    console.error('Failed to verify online status:', error);
  }
};

// Callbacks for online status changes
type OnlineStatusCallbacks = {
  userCameOnline?: (data: OnlineStatusData) => void;
  userWentOffline?: (data: OnlineStatusData) => void;
  onlineUsersList?: (data: OnlineUsersListData) => void;
};

let onlineStatusCallbacks: OnlineStatusCallbacks = {};

// Register callbacks for online status changes
export const registerOnlineStatusCallbacks = (callbacks: OnlineStatusCallbacks) => {
  onlineStatusCallbacks = { ...onlineStatusCallbacks, ...callbacks };
};

// Check online status of a specific user
export const checkUserOnlineStatus = async (userId: string) => {
  try {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`/api/v1/users/${userId}/online-status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error checking user online status:', error);
    throw error;
  }
};

// Check online status of multiple users
export const checkBulkOnlineStatus = async (userIds: string[]) => {
  try {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`/api/v1/users/bulk-online-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userIds })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error checking bulk online status:', error);
    throw error;
  }
};

// Get online users count
export const getOnlineUsersCount = async () => {
  try {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`/api/v1/users/online/count`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return data.data.count;
  } catch (error) {
    console.error('Error getting online users count:', error);
    throw error;
  }
}; 