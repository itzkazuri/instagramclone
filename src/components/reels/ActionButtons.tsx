'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark,
  MoreHorizontal,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reel } from '@/lib/dummy-data';

interface ActionButtonsProps {
  reel: Reel;
  isLiked: boolean;
  isBookmarked: boolean;
  isFollowing: boolean;
  likeCount: number;
  isPlaying: boolean;
  onLike: (e: React.MouseEvent) => void;
  onComment: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
  onBookmark: (e: React.MouseEvent) => void;
  onFollow: (e: React.MouseEvent) => void;
  formatCount: (count: number) => string;
}

export function ActionButtons({ 
  reel, 
  isLiked, 
  isBookmarked, 
  isFollowing, 
  likeCount, 
  isPlaying,
  onLike, 
  onComment, 
  onShare, 
  onBookmark, 
  onFollow,
  formatCount
}: ActionButtonsProps) {
  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5">
      {/* Like Button */}
      <div className="flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 mb-1"
          onClick={onLike}
        >
          <Heart 
            className={cn(
              "w-7 h-7",
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )} 
          />
        </Button>
        <span className="text-xs text-white font-medium">
          {formatCount(likeCount)}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 mb-1"
          onClick={onComment}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </Button>
        <span className="text-xs text-white font-medium">
          {formatCount(reel.comments)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 mb-1"
          onClick={onShare}
        >
          <Send className="w-7 h-7 text-white" />
        </Button>
        <span className="text-xs text-white font-medium">
          {formatCount(reel.shares)}
        </span>
      </div>

      {/* Bookmark Button */}
      <Button
        size="icon"
        variant="ghost"
        className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20"
        onClick={onBookmark}
      >
        <Bookmark 
          className={cn(
            "w-7 h-7",
            isBookmarked ? "fill-yellow-500 text-yellow-500" : "text-white"
          )} 
        />
      </Button>

      {/* More Options */}
      <Button
        size="icon"
        variant="ghost"
        className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20"
      >
        <MoreHorizontal className="w-7 h-7 text-white" />
      </Button>

      {/* User Avatar (for profile quick access) */}
      <div className="mt-2 relative">
        <Avatar className="w-12 h-12 border-2 border-white">
          <AvatarImage src={reel.user.avatar} alt={reel.user.name} />
          <AvatarFallback className="text-black font-bold text-xs">
            {reel.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {!isFollowing && (
          <Button
            size="icon"
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 border-2 border-white"
            onClick={onFollow}
          >
            <UserPlus className="w-3 h-3 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}