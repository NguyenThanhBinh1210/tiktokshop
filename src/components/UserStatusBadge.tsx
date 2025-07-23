import React from 'react';
import { useContext } from 'react';
import { AppContext } from '~/contexts/app.context';

interface UserStatusBadgeProps {
  userId: string;
  showDot?: boolean;
  showText?: boolean;
  className?: string;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({
  userId,
  showDot = true,
  showText = true,
  className = ''
}) => {
  const { checkUserOnlineStatus } = useContext(AppContext);
  const isOnline = checkUserOnlineStatus(userId);

  return (
    <div className={`flex items-center ${className}`}>
      {showDot && (
        <span 
          className={`inline-block w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
        />
      )}
      {showText && (
        <span className="ml-1 text-xs">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      )}
    </div>
  );
};

// Status dot indicator
export const StatusDot: React.FC<{ isOnline: boolean; className?: string }> = ({ isOnline, className = '' }) => (
  <span 
    className={`inline-block w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} ${className}`}
  />
);

// Status badge
export const StatusBadge: React.FC<{ isOnline: boolean; className?: string }> = ({ isOnline, className = '' }) => (
  <span 
    className={`status-badge ${isOnline ? 'bg-green-500' : 'bg-gray-400'} text-white text-xs px-2 py-0.5 rounded-full ${className}`}
  >
    {isOnline ? 'Online' : 'Offline'}
  </span>
);

export default UserStatusBadge; 