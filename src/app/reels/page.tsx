"use client";

import { useState, useMemo } from "react";
import { CommentSheet } from "@/components/reels/comments/CommentSheet";
import { ReelContainer } from "@/components/reels/ReelContainer";
import { Comment } from "@/types";
import { DUMMY_REELS } from "@/lib/dummy-data";
import { shuffleArray } from "@/lib/shuffleArray";
import { Reel } from "@/lib/dummy-data";
import { generateDummyComments } from "@/lib/generateDummyComments";

export default function ReelsPage() {
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const shuffledReels: Reel[] = useMemo(() => {
    return shuffleArray(DUMMY_REELS);
  }, []);

  const handleOpenComments = () => {
    setIsCommentSheetOpen(true);
  };

  const handleCloseComments = () => {
    setIsCommentSheetOpen(false);
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: "current-user",
        username: "current_user",
        cosplayerName: "Current User",
        avatar: "/current-user-avatar.png",
        isVerified: false,
      },
      content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
    };

    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] w-full bg-black md:h-screen">
      <ReelContainer
        onOpenComments={handleOpenComments}
        shuffledReels={shuffledReels}
      />

      <CommentSheet
        comments={comments}
        isOpen={isCommentSheetOpen}
        onClose={handleCloseComments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
