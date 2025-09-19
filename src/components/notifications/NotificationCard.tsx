'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  AtSign,
  MoreHorizontal,
  Check,
  UserCheck
} from 'lucide-react';
import { Notification } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface NotificationCardProps {
  notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const [isFollowingBack, setIsFollowingBack] = useState(false);
  const [isRead, setIsRead] = useState(notification.isRead);

  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'likes':
        return <Heart className="w-5 h-5 text-red-500 fill-current" />;
      case 'comments':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follows':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'mentions':
        return <AtSign className="w-5 h-5 text-purple-500" />;
      default:
        return <Heart className="w-5 h-5 text-red-500" />;
    }
  };

  // Get message based on notification type
  const getMessage = () => {
    switch (notification.type) {
      case 'likes':
        return (
          <>
            <span className="font-semibold">{notification.user?.name}</span> liked your post
          </>
        );
      case 'comments':
        return (
          <>
            <span className="font-semibold">{notification.user?.name}</span> commented on your post
          </>
        );
      case 'follows':
        return (
          <>
            <span className="font-semibold">{notification.user?.name}</span> started following you
          </>
        );
      case 'mentions':
        return (
          <>
            <span className="font-semibold">{notification.user?.name}</span> mentioned you in a comment
          </>
        );
      default:
        return (
          <>
            <span className="font-semibold">{notification.user?.name}</span> interacted with your post
          </>
        );
    }
  };

  // Handle follow back
  const handleFollowBack = () => {
    setIsFollowingBack(!isFollowingBack);
  };

  // Handle mark as read
  const handleMarkAsRead = () => {
    setIsRead(!isRead);
  };

  return (
    <div className={cn(
      "p-4 hover:bg-gray-50 transition-colors duration-150",
      !isRead && "bg-blue-50"
    )}>
      <div className="flex items-start">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1 mr-3">
          {getIcon()}
        </div>

        {/* Avatar and Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarImage src={notification.user?.avatar} alt={notification.user?.name} />
              <AvatarFallback>{notification.user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 break-words">
                    {getMessage()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 ml-2 flex-shrink-0"
                  onClick={handleMarkAsRead}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Action buttons for follows */}
              {notification.type === 'follows' && (
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className={cn(
                      "rounded-full",
                      isFollowingBack 
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300" 
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    )}
                    onClick={handleFollowBack}
                  >
                    {isFollowingBack ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Following</span>
                        <span className="sm:hidden">Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Follow Back</span>
                        <span className="sm:hidden">Follow</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {/* Preview for likes/comments */}
              {(notification.type === 'likes' || notification.type === 'comments' || notification.type === 'mentions') && notification.postPreview && (
                <div className="mt-3 bg-gray-100 rounded-lg p-3 max-w-md">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {notification.postPreview}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}