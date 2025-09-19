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
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
        <div className="flex items-center">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-6 ml-2" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <img
          src={author.avatar || "/placeholder.svg"}
          alt={author.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{author.cosplayerName || author.username}</span>
            {author.isVerified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            {!isCurrentUser && (
                <>
                    <span className="text-gray-400 text-xs">·</span>
                    <button onClick={onFollowToggle} className={`text-sm font-semibold ${isFollowing ? 'text-gray-500' : 'text-blue-500 hover:text-blue-700'}`}>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </>
            )}
          </div>
          <span className="text-gray-500 text-xs">@{author.username}</span>
        </div>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 mr-2">
              <MoreHorizontal size={20} />
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
            <X size={24} />
        </button>
      </div>
    </div>
  );
}