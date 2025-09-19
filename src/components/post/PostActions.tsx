"use client"

import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostActionsProps {
  isLiked: boolean;
  isSaved: boolean;
  likesCount: number;
  onLike: () => void;
  onSave: () => void;
}

export function PostActions({ isLiked, isSaved, likesCount = 0, onLike, onSave }: PostActionsProps) {
  const handleShareToDm = () => {
    // TODO: Implement share to DM logic
    console.log("Sharing to DM...");
  };

  const handleCopyLink = () => {
    // TODO: Implement copy link logic
    navigator.clipboard.writeText(window.location.href);
    console.log("Link copied to clipboard");
  };

  return (
    <>
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
            <button
                onClick={onLike}
                className={`transition-colors ${isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
            >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
                <MessageCircle size={24} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Send size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={handleShareToDm}>
                  Share to DM
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleCopyLink}>
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <button
                onClick={onSave}
                className={`transition-colors ${isSaved ? "text-yellow-500" : "text-gray-600 hover:text-yellow-500"}`}
            >
            <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
            </button>
        </div>
        <div className="text-sm font-semibold">{likesCount.toLocaleString()} likes</div>
    </>
  );
}

