"use client";

import { useState, useEffect } from "react";
import { ReelItem } from "./ReelItem";
import { useReels } from "./hooks/useReels";
import { Reel } from "@/lib/dummy-data";
import { Comment } from "@/types";
import { generateDummyComments } from "@/lib/generateDummyComments";

interface ReelContainerProps {
  onOpenComments: () => void;
  shuffledReels: Reel[];
}

export function ReelContainer({
  onOpenComments,
  shuffledReels,
}: ReelContainerProps) {
  const {
    currentReelIndex,
    containerRef,
    handleTouchStart,
    handleTouchEnd,
    handleScroll,
  } = useReels({ shuffledReels });

  const [comments, setComments] = useState<Comment[]>([]);

  // Generate comments when a reel is selected
  useEffect(() => {
    // Generate a random number of comments for the current reel
    const commentCount = Math.floor(Math.random() * 20) + 5;
    setComments(generateDummyComments(commentCount));
  }, [currentReelIndex]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full overflow-y-auto snap-y snap-mandatory"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
    >
      {shuffledReels.map((reel, index) => {
        // Load current reel and 1 reel before and after for smooth transitions
        const shouldLoad = Math.abs(index - currentReelIndex) <= 1;
        
        return (
          <div key={reel.id} className="h-full w-full snap-start flex-shrink-0">
            <ReelItem
              reel={reel}
              isActive={index === currentReelIndex}
              onCommentClick={index === currentReelIndex ? onOpenComments : undefined}
              shouldLoad={shouldLoad}
            />
          </div>
        );
      })}
    </div>
  );
}