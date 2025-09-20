"use client"

import { User } from "@/types";

interface CommentInputProps {
  currentUser: User;
  newComment: string;
  setNewComment: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CommentInput({ currentUser, newComment, setNewComment, onSubmit }: CommentInputProps) {
  if (!currentUser) {
    return null;
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-2 md:space-x-3 mt-2 md:mt-3">
        <img
            src={currentUser.avatar || "/placeholder.svg"}
            alt={currentUser.username}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex">
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 text-sm border-none outline-none bg-transparent placeholder-gray-500"
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        onSubmit(e);
                    }
                }}
            />
            {newComment.trim() && (
                <button
                    type="submit"
                    className="text-blue-500 text-xs md:text-sm font-semibold hover:text-blue-600 transition-colors ml-1 md:ml-2"
                >
                    Post
                </button>
            )}
        </div>
    </form>
  );
}