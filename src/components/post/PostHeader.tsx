"use client"

import { User } from "@/types";
import { MoreHorizontal, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostHeaderProps {
  author: User;
  onClose: () => void;
  isFollowing: boolean;
  onFollowToggle: () => void;
  isCurrentUser: boolean;
}

export function PostHeader({ author, onClose, isFollowing, onFollowToggle, isCurrentUser }: PostHeaderProps) {
  const handleReport = () => {
    // TODO: Implement report logic
    console.log("Reporting post...");
  };

  if (!author) {
    return (
      <div className="flex items-center justify-between p-3 md:p-4 border-b">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          <div className="space-y-1 md:space-y-2">
            <Skeleton className="h-3 md:h-4 w-[100px] md:w-[150px]" />
            <Skeleton className="h-2 md:h-3 w-[70px] md:w-[100px]" />
          </div>
        </div>
        <div className="flex items-center">
            <Skeleton className="h-4 w-4 md:h-5 md:w-5" />
            <Skeleton className="h-5 w-5 md:h-6 md:w-6 ml-1 md:ml-2" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between p-3 md:p-4 border-b">
      <div className="flex items-center space-x-2 md:space-x-3">
        <img
          src={author.avatar || "/placeholder.svg"}
          alt={author.username}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <span className="font-semibold text-xs md:text-sm">{author.cosplayerName || author.username}</span>
            {author.isVerified && (
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[6px] md:text-xs">✓</span>
              </div>
            )}
            {!isCurrentUser && (
                <>
                    <span className="text-gray-400 text-[10px] md:text-xs">·</span>
                    <button onClick={onFollowToggle} className={`text-xs md:text-sm font-semibold ${isFollowing ? 'text-gray-500' : 'text-blue-500 hover:text-blue-700'}`}>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </>
            )}
          </div>
          <span className="text-gray-500 text-[10px] md:text-xs">@{author.username}</span>
        </div>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 mr-1 md:mr-2">
              <MoreHorizontal size={16} className="md:w-5 md:h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleReport}>
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
        >
            <X size={20} className="md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}