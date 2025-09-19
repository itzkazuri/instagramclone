'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Music, UserPlus } from 'lucide-react';
import { Reel } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

interface VideoInfoProps {
  reel: Reel;
  isFollowing: boolean;
  onFollow: (e: React.MouseEvent) => void;
}

export function VideoInfo({ reel, isFollowing, onFollow }: VideoInfoProps) {
  return (
    <div className="absolute bottom-0 left-0 right-16 p-4 pb-6">
      <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent -m-4 p-4 pt-12">
        {/* User Info */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-12 h-12 border-2 border-white flex-shrink-0">
            <AvatarImage src={reel.user.avatar} alt={reel.user.name} />
            <AvatarFallback className="text-black font-bold">
              {reel.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white text-lg truncate">
                @{reel.user.username}
              </h3>
              {reel.user.isVerified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            
            <p className="text-white text-sm mb-2 leading-relaxed">
              {reel.caption}
            </p>
            
            {reel.audio && (
              <div className="flex items-center gap-2 text-white/90">
                <Music className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{reel.audio}</span>
              </div>
            )}
          </div>
          
          <Button
            size="sm"
            className={cn(
              "h-8 rounded-full border-2 font-semibold transition-all",
              isFollowing 
                ? "bg-transparent border-white/30 text-white hover:bg-white/20" 
                : "bg-red-500 border-red-500 text-white hover:bg-red-600"
            )}
            onClick={onFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </div>
  );
}