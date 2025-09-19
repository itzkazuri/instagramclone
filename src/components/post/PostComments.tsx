"use client"

import { Comment } from "@/types";
import { Heart } from "lucide-react";

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${Math.floor(diff / (1000 * 60))}m`;
};

interface PostCommentsProps {
    comments: Comment[];
}

export function PostComments({ comments }: PostCommentsProps) {
    return (
        <div className="p-4 space-y-4">
            {comments.filter(comment => comment && comment.author).map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                    <img
                        src={comment.author.avatar || "/placeholder.svg"}
                        alt={comment.author.username}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">{comment.author.cosplayerName || comment.author.username}</span>
                            <span className="text-gray-500 text-xs">{formatTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                        <div className="flex items-center space-x-3 mt-2">
                            <button className="text-xs text-gray-500 hover:text-red-500 flex items-center space-x-1">
                                <Heart size={12} className={comment.isLiked ? "text-red-500 fill-current" : ""} />
                                <span>{comment.likesCount}</span>
                            </button>
                            <button className="text-xs font-semibold text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
