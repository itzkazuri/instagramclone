'use client';

import { Comment } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: id 
      });
    } catch {
      return 'baru saja';
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
        <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 rounded-2xl px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.author.cosplayerName || comment.author.username}</span>
            {comment.author.isVerified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px]">✓</span>
              </div>
            )}
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-gray-500">
            {formatTimeAgo(comment.createdAt)}
          </span>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Heart className="h-3 w-3 mr-1" />
            {comment.likesCount > 0 ? comment.likesCount : 'Like'}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <MessageCircle className="h-3 w-3 mr-1" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}